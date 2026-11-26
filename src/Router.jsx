import React from 'react'
import Layout from './Layout'
import { Route, Routes } from 'react-router-dom'
import MainPages from './MainPages'
import Project from './Project'
import Experience from './Experience'
import Services from './Services'
import Contact from './Contact'
import VideoMonitor from './VideoMonitor'
import AISettings from './AISettings'
import Certifications from './Certifications'

const Router = () => {
  return (
        <Routes>
                  <Route  element={<Layout />} >

                  <Route path="/" element={<MainPages />} />
                  <Route path="/about" element={<Experience />} />
                  <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Project />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/certifications" element={<Certifications />} />



                  </Route>

                  {/* <Route path="/settings" element={<AISettings />} /> */}

</Routes>
  )
}

export default Router
