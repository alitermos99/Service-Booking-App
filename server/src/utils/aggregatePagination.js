import mongoose from 'mongoose';

export default async function aggregatePagination(model, pipeline, {
    cursor,
    limit     = 10,
    sortField = 'createdAt',
    sortOrder = 'desc',
}) {
    const limitNum = parseInt(limit);
    const sortOrder_n = sortOrder === 'asc' ? 1 : -1;

    if (cursor) {
        const parsed = JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'));
        const cursorVal = isDateField(sortField)
            ? new Date(parsed.value)
            : parsed.value;

        pipeline.push({
            $match: {
                $or: [
                    { [sortField]: { [sortOrder_n === 1 ? '$gt' : '$lt']: cursorVal } },
                    {
                        [sortField]: cursorVal,
                        _id: {
                            [sortOrder_n === 1 ? '$gt' : '$lt']: new mongoose.Types.ObjectId(parsed.id)
                        }
                    }
                ]
            }
        });
    }

    const [countResult] = await model.aggregate([...pipeline, { $count: 'total' }]);
    const totalRecords  = countResult?.total || 0;

    pipeline.push({ $sort: { [sortField]: sortOrder_n, _id: sortOrder_n } });
    pipeline.push({ $limit: limitNum + 1 });

    const docs = await model.aggregate(pipeline);
    const hasMore = docs.length > limitNum;
    const results = hasMore ? docs.slice(0, limitNum) : docs;

    const encode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64');

    const nextCursor = hasMore
        ? encode({ value: results[results.length - 1][sortField], id: results[results.length - 1]._id, direction: 'next' })
        : null;

    const hasPrevPage = !!cursor;
    const prevCursor = hasPrevPage
        ? encode({ value: results[0][sortField], id: results[0]._id, direction: 'prev' })
        : null;

    return {
        results,
        nextCursor,
        prevCursor,
        hasNextPage: hasMore,
        hasPrevPage,
        totalRecords
    };
}

function isDateField(field) {
    return ['startTime', 'endTime', 'createdAt', 'updatedAt'].includes(field);
}