import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { RestaurantsContext } from '../context/RestaurantContext'
import api from '../services/api'

import AddReview from '../components/AddReview'
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews'

const RestaurantDetail = () => {

    const { id } = useParams()
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/${id}`)
                setSelectedRestaurant(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            {selectedRestaurant && (
                <>
                    <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews}/>
                    </div>
                    <AddReview />
                </>
            )}
        </div>
    )
}

export default RestaurantDetail