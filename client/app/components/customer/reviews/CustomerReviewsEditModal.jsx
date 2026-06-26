import React from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'

const CustomerReviewsEditModal = ({ setIsModalOpen }) => {
    return (
        <Modal>
            <div className="glass rounded-2xl w-full max-w-lg border border-solid border-[rgba(255,255,255,0.12)]">
                <div className="flex items-center justify-between p-6 border border-solid border-[rgba(255,255,255,0.07)]">
                    <h3 className="font-semibold text-tx text-lg">Edit Review</h3>
                    <Button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.05)]"
                        label={
                            <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        }
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>

                <div className="p-6 space-y-5">
                    <div>
                        <p className="text-sm font-medium text-tx mb-3">Your Rating</p>

                        <div className="flex items-center gap-1">
                            <span className="text-2xl text-fair">★★★★★</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-tx block mb-2">Your Review</label>
                        <textarea rows="4" className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none text-tx
                                bg-[rgba(26,26,36,0.6)] border-[rgba(255,255,255,0.094)] border border-solid
                            " 
                            >Dr. Park was incredibly insightful. She helped clarify my business strategy within the first 20 minutes. 
                            Highly recommend for any startup founder!
                        </textarea>
                    </div>

                    <div className="flex gap-3 pt-1">
                        <Button className="flex-1 py-2.5 rounded-xl text-sm font-medium text-weak bg-[rgba(248,113,113,0.1)]
                                border-[rgba(248,113,113,0.2)] border border-solid
                            " 
                            label="Delete Review"
                        />

                        <Button className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white btn-primary"
                            label="Save Changes"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CustomerReviewsEditModal