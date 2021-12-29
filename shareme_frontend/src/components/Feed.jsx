import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner.jsx'

const Feed = () => {

    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        if(categoryId) {
            setLoading(true);
            const query = searchQuery(categoryId);
            client.fetch(query).then((data) => {
                setPins(data);
                setLoading(false);
            })
        } else {
            setLoading(true);

            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [categoryId]);

    if(loading) return <Spinner message="We are adding new ideas to your feed !!!" />

    if(!pins?.length) 
        return(
            <h2 className="font-oswald text-2xl">No Posts related to this Category is available</h2>
        ) 

    return (
        <div className="h-full bg-gray-300 rounded-t-xl rounded-b-xl">
            {pins && (<MasonryLayout pins={pins} />)}
        </div>
    )
}

export default Feed
