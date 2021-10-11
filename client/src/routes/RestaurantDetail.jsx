import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { RestaurantsContext } from '../context/RestaurantContext'
import api from '../services/api'

const RestaurantDetail = () => {

    const { id } = useParams()
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/${id}`)
                setSelectedRestaurant(response.data.data.restaurant)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            <h1 className="text-center">{selectedRestaurant && selectedRestaurant.name}</h1>
        </div>
    )
}

export default RestaurantDetail