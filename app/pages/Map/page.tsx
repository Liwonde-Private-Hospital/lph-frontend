import React from "react";
import './map.css'


export default function Map(){
    return(
        <div className="map">
            <iframe
     title="Google Map"
     width="1360"
    height="650"
     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3852.6455704410355!2d35.2220114746039!3d-15.067707805480786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18d927b9f6d2f0dd%3A0x90ebf7bc5f36d7bb!2sLiwonde%20Private%20Hospital!5e0!3m2!1sen!2smw!4v1706522849156!5m2!1sen!2smw"
      style={{ border: 0 }}
     allowFullScreen
     loading="lazy"
       referrerPolicy="no-referrer-when-downgrade"
          >

                                </iframe>
        </div>
    )
}