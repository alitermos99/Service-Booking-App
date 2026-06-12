export default async function paginate(model, { cursor, limit = 10, sort, filter = {} }) {
	const limitNum = parseInt(limit);
	const sortOrder = sort?.order === 'asc' ? 1 : -1;
	const sortField = sort?.field || 'createdAt';

	const cursorCondition = cursor
        ? {
            $or: [
                { [sortField]: { [sortOrder === 1 ? '$gt' : '$lt']: cursor.value } },
                {
                    [sortField]: cursor.value,
                    _id: { [sortOrder === 1 ? '$gt' : '$lt']: cursor.id }
                }
            ]
        }
        : {};

	const isPrev = cursor?.direction === 'prev';
    const appliedSort = isPrev ? sortOrder * -1 : sortOrder;
	const query = { ...filter, ...cursorCondition };

	const docs = await model
        .find(query)
        .sort({ [sortField]: appliedSort, _id: appliedSort })
        .limit(limitNum + 1)
        .lean();

	const hasMore = docs.length > limitNum;
	const results = hasMore ? docs.slice(0, limitNum) : docs;

	if (isPrev) {
		results = results.reverse();
	}

	const hasNextPage = isPrev ? true  : hasMore;
    const hasPrevPage = isPrev ? hasMore : !!cursor;

	const nextCursor = hasNextPage
        ? {
            value:     results[results.length - 1][sortField],
            id:        results[results.length - 1]._id,
            direction: 'next'
        }
        : null;

    const prevCursor = hasPrevPage
        ? {
            value:     results[0][sortField],
            id:        results[0]._id,
            direction: 'prev'
        }
        : null;

	return { results, nextCursor, prevCursor, hasNextPage, hasPrevPage };
}