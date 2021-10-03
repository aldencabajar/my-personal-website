import React, {useEffect, useState} from "react";
import "css/Resume.css";
import WorkExpData from "data/WorkExperience.json"
import WorkExperience from "components/Resume/WorkExperience";
import Skills from "components/Resume/Skills";
import Publications from "components/Resume/Publications";
import Navigation from "components/SideNavigation";
import Layout from 'components/layout';


const Resume=()=>{
    const [cellOffset, setCellOffset] = useState([0, 0, 0])
    const [pageYOffset, SetOffset] = useState(window.pageYOffset || document.documentElement.scrollTop)

    const navData = [
        {title: "Work Experience", id: "workExperience"},
        {title: "Skills", id: "skills-display"},
        {title: "Publications", id: "publications"}
    ] 

    useEffect(()=>{
        const onScroll=(e) =>{
            SetOffset(window.pageYOffset || document.documentElement.scrollTop)
        }
        window.addEventListener("scroll", onScroll)
        return ()=>{
            window.removeEventListener("scroll", onScroll)
        }
        // console.log(cellOffset)
    }, [])
    
    return(
        <Layout>
            <div className="section-body">
                <header className="section-header">
                    <h1>Resume</h1>
                    <h3>My current professional experience.</h3>
                </header>
                <div id="resume-all">
                    <div id="resume-main">
                        <WorkExperience data={WorkExpData} handleState={setCellOffset} order={0}/>
                        <Skills handleState={setCellOffset} order={1} />
                        <Publications handleState={setCellOffset} order={2}/>
                    </div>
                    <Navigation header={'Contents'} data={navData} 
                    cellOffset={cellOffset} pageYOffset={pageYOffset} 
                    route={"/Resume"} className='side-nav side-nav-resume' />
                </div>
            </div>
        </Layout>


    )
}
export default Resume