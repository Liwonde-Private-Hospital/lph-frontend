import React from "react"
import './style.css'
import Image from "next/image"
import avatar from '../images/avatar.webp'

 export default function Staff(){
  return(
    <div>
      <div className="card">
        <Image
         src={avatar}
         alt="avata"
         width={132}
         height={128}
        className="image"
        />
        <h1 className="name1"></h1>
        <p className="title">Finance Manager</p>
        
        <a href="Finance/Login">
        <button className="btn">Login</button>
        </a>
       
      </div>
      <div className="card">
        <Image
         src={avatar}
         alt="avata"
         width={132}
         height={128}
        className="image"
        />
        <h1 className="name1"></h1>
        <p className="title">OPD</p>
        <div className="desc">
             
        </div>
        <a href="OPD/Login">
        <button className="btn">Login</button>
        </a>
      </div>
      <div className="card">
        <Image
         src={avatar}
         alt="avata"
         width={132}
         height={128}
        className="image"
        />
        <h1 className="name1"></h1>
        <p className="title">Phamarcist</p>
       
        <a href="Pharmacy2/Login">
        <button className="btn">Login</button>
        </a>
      </div>
      <div className="card">
        <Image
         src={avatar}
         alt="avata"
         width={132}
         height={128}
        className="image"
        />
        <h1 className="name1"></h1>
        <p className="title">Martenity</p>
        
        <a href="Martenity/Login">
        <button className="btn">Login</button>
        </a>
      </div>
      <div className="card">
        <Image
         src={avatar}
         alt="avata"
         width={132}
         height={128}
        className="image"
        />
        <h1 className="name1"></h1>
        <p className="title">Receptionist</p>
        
        <a href="Reception/Login">
        <button className="btn">Login</button>
        </a>
      </div>
      <div className="card">
        <Image
         src={avatar}
         alt="avata"
         width={132}
         height={128}
        className="image"
        />
        <h1 className="name1"></h1>
        <p className="title">Radiographer</p>
        
        <a href="X-Ray/Login">
        <button className="btn">Login</button>
        </a>
      </div>
      <div className="card">
        <Image
         src={avatar}
         alt="avata"
         width={132}
         height={128}
        className="image"
        />
        <h1 className="name1"></h1>
        <p className="title">Lab Technician</p>
       
        <a href="Lab/Login">
        <button className="btn">Login</button>
        </a>
        
      </div>
      <div className="card">
        <Image
         src={avatar}
         alt="avata"
         width={132}
         height={128}
        className="image"
        />
        <h1 className="name1"></h1>
        <p className="title">Dentist</p>
        
        <a href="Dental/Login">
        <button className="btn">Login</button>
        </a>
        
      </div>
      <div className="card">
        <Image
         src={avatar}
         alt="avata"
         width={132}
         height={128}
        className="image"
        />
        <h1 className="name1"></h1>
        <p className="title">Backstore</p>
        
        <a href="Backstore/Login">
        <button className="btn">Login</button>
        </a>
       
       
      
        
      </div>
      <div className="card">
        <Image
         src={avatar}
         alt="avata"
         width={132}
         height={128}
        className="image"
        />
          <h1 className="name1"></h1>
        <p className="title">Vitals</p>
        
        <a href="Vitals/Login">
        <button className="btn">Login</button>
        </a>
       
       
        
      </div>
    </div>
  )
 }