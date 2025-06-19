import React from 'react'
import logo from '../assets/logo.png';

export default function About() {
  return (
    <>
      <div className="card mt-5" style={{width: "25rem;", height: "55rem"}}>
        <h1 className='text-center text-secondary mt-5'>About - Us</h1>
            <div className="card-body">
                <div className='row'>
                    <div className="col-md-6">
                        <img src={logo} alt="Logo" height="60" className="rounded border shadow"
                            style={{ width: "200px", height: "200px", cursor: "pointer", marginLeft: "120px", marginTop: "80px" }}/>
                    </div>
                    <div className="col-md-6" style={{marginTop: "40px"}}>
                        <h2 className='mb-3'>About PortfolioBuilder</h2>
                        <ul>
                        <li><p><strong>Portfolio - Builder</strong> is a simple and powerful web app that helps users create and 
                        download their own professional portfolio websites in just minutes — no coding skills required!
                        </p></li>

                        <li><p>
                            We understand that not everyone has the time or skills to build a personal website from scratch. Our mission is to empower students, freelancers, 
                            and job seekers with beautiful, static HTML portfolios that showcase their achievements, experience, and personality.
                        </p></li>

                        <li><p>Just fill out your details, and get a clean, downloadable HTML page customized with your profile, projects, and more.</p></li>

                        <li><strong>Download your HTML file and host it anywhere!</strong></li>

                        </ul>
                            
                    </div>




                    <div className="col-md-6" style={{marginTop: "40px"}}>
                        <h2 className='mx-5'>How it Works?</h2>
                            <ul className='mx-5'>
                                <li className='mb-2'>Simply Register / Login in the Website</li>
                                <li className='mb-2'>Go to Create Portfolio</li>
                                <li className='mb-2'>Then Upload data into basicdetails form and </li>
                                <li className='mb-2'>Then Upload data into maindetails form and</li>
                                <li className='mb-2'>Then Upload Profile-Image, Cover-Image then submit this form</li>
                                <li className='mb-2'>Download Your html file</li>
                                <li className='mb-2'>Host anywhere your downloaded html file </li>
                            </ul>
                    </div>
                    <div className="col-md-6" style={{marginTop: "55px"}}>
                            <h4>💡 Simple to Use</h4>
                            <p className='mx-5'>No coding or design needed. Just fill a form and click generate.</p>
                           
                        
                            <h4>⚡ Instant Download</h4>
                            <p className='mx-5'>Get your portfolio in seconds as a clean static HTML page.</p>
                            
                            <h4>🌍 Share Anywhere</h4>
                            <p className='mx-5'>Host your site, attach it to job applications, or share via link.</p>
                    </div>

                    <div className="col-md-12">
                        <p className='text-center text-secondary' style={{marginTop: "60px"}}>Designed & Developed by <strong>Krish Bhuva</strong>, a passionate developer who wants to make professional websites available for everyone.</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
