import React, { useRef, useState, useEffect } from 'react'

import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name');
        emailEl.current.value = window.localStorage.getItem('email');
    }, [])

    const handleCommentSubmit = () => {
        setError(false);

        const {value: comment } = commentEl.current;
        const {value: name } = nameEl.current;
        const {value: email } = emailEl.current;
        const {checked: storeData } = storeDataEl.current;

        if( !comment || !name || !email ){
            setError(true);
            return;
        }

        const commentObj = { name, email, comment, slug };

        if (storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name', name);
            window.localStorage.removeItem('email', email);
        }

        submitComment(commentObj)
            .then((res)=>{
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            });
    }

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a reply</h3>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea
                    ref={commentEl}
                    className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                    placeholder='Add your reply here ....'
                    name='name'
                />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                <input 
                    ref={nameEl}
                    type='text'
                    className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                    placeholder='Name'
                    name='name'
                />
                <input 
                    ref={emailEl}
                    type='email'
                    className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                    placeholder='Email'
                    name='email'
                />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <div>
                    <input className='p-1' ref={storeDataEl} type='checkbox' id='storeData' name='storeData' value='true'/> 
                    <label htmlFor='storeData' className='ml-2 text-gray-500 cursor-pointer'>Save my name and e-mail for next time I comment.</label>
                </div>
            </div>
            {error && <p className='text-xs text-red-500 italic'>* All fields are required</p>}
            <div className='mt-8'>
                <button 
                    type='button'
                    onClick={handleCommentSubmit}
                    className='transition duration-500 ease hover:bg-green-800 bg-green-500 text-white inline-block rounded-full px-6 py-3 cursor-pointer'
                >
                    Comment
               </button>
               { showSuccessMessage && <span className='float-right text-green-500'>Comment submitted for review</span>}
            </div>
        </div>
    )
}

export default CommentsForm
