import axios from 'axios'
import React, { useState, useEffect } from 'react'

const UseEffectRender:React.FC = () => {
    const [user, setUser] = useState<EachUser>()
    // JSONPlaceholder APIを使用
    const fetchJSON = async() => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users/1');
        return res.data
    }

    type EachUser = {
        id: number,
        name: string,
        username: string,
        email: string,
        address: {
            street: string,
            suite: string,
            city: string,
            zipcode: string,
            geo: {
                lat: string,
                lng: string,
            }
        },
        phone: string,
        website: string,
        company: {
            name: string,
            catchPhrase: string,
            bs: string,
        }
    }

    useEffect(() => {
        const fetchUser = async()  => {
            const user:EachUser = await fetchJSON();
            setUser(user)
        }
        fetchUser()
    }, [user])

    return (
        <div>
            {user ? 
                <p>I am {user.username} : {user.email}</p>
            : null
            }
        </div>
    )
}

export default UseEffectRender
