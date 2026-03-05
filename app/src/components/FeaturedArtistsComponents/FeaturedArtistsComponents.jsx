import React from 'react'
import './FeaturedArtistsComponents.css'
import TitleComponent from '../TitleComponent/TitleComponent'
import { artists, assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const FeaturedArtistsComponents = () => {
  return (
    <>
    <div id='featured-artists-container' className="featured-artists-container">
        <TitleComponent title="Feature Artists"/>
        <div className="featured-artists-profile">
            {
                artists.map((artist)=>(
                    artist.featured ?
                    <>
                    <div key={artist._id} className="featured-artist">
                        <div className="featured-artist-image">
                           <Link to={`/artist/${artist.name}`}> <img src={artist.avatar} alt="avatar" /></Link>
                        </div>
                        <div className="featured-artist-detail">
                            <p>@{artist.name}<img src={assets.blueCheckMark} alt="verification mark" /> </p>
                        </div>
                    </div>
                    </>
                    :
                    <></>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default FeaturedArtistsComponents