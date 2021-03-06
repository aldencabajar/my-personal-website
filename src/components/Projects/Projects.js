import data from "../../data/ProjectsData.json"
import HoverImage from "./ProjectHover"
import Navigation from  "../SideNavigation"
import React, {useRef, useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import '../../css/projects.css'



class ProjectCell extends React.Component {
    constructor(props) {
        super(props)
        this.project = this.props.project
    }
    render() {
        return(
        <div className="proj-cell">
            <span id={this.project.id}> &nbsp; </span>
            <div className="body">
                <h3 ref={this.props.inputRef}>{this.project.title}</h3>
                <h5>{this.project.sub}</h5>
                <p>{this.project.description}</p>
            {this.project.image !== "" &&
                <HoverImage image={this.project.image} gh={this.project.gh_link} 
                blog_link={this.project.blog_link}/>}
            </div>
        </div>
        )

    }

}



const Projects=()=>{
    const h3elems = useRef([])
    const [Dims, SetDims] = useState([])
    const [pageYOffset, SetOffset] = useState(window.pageYOffset || document.documentElement.scrollTop)
    const ScrollEventHandler=()=>{
        var top = window.pageYOffset || document.documentElement.scrollTop
        SetOffset(top)
    }

    const UpdateElemDims=(elements, yoffset)=>{
        SetDims(elements.map((elem)=>{
            const node = ReactDOM.findDOMNode(elem)
            const {top} = node.getBoundingClientRect()
            return (top + yoffset)
        }))
    }

    useEffect(()=>{
        let elems = h3elems.current
        UpdateElemDims(elems, pageYOffset)
        const resizeEventHandler=()=>{
            // const foo = ReactDOM.findDOMNode(h3elems.current[1])
            let elems = h3elems.current
            UpdateElemDims(elems, pageYOffset)

        } 
        window.addEventListener("scroll", ScrollEventHandler)
        window.addEventListener("resize", resizeEventHandler)
        return()=>{
            window.removeEventListener("Scroll", ScrollEventHandler)
            window.removeEventListener("resize", resizeEventHandler)
        }
    }, [pageYOffset])

    return (
        <div className="section-body">
            <header className ="section-header">
                <h1> Projects </h1>
                <h3>Been doing this and that.</h3>
            </header>
            <div className="project-container">
                <div className="project-cell-container">
                    { data.map((project, index) => {
                        return(
                            <ProjectCell project={project} 
                            inputRef={
                                (element)=>{
                                    h3elems.current[index]=element
                                }}/>
                        )
                    })}
                </div>
                <div className="side-nav">
                    <header>
                        <h3>Contents</h3>
                    </header>
                    <Navigation data={data}
                    cellOffset={Dims}
                    pageYOffset={pageYOffset}
                    route={"/projects"}
                    />
                </div>
            </div>
        </div>
    )
    
}


export default Projects;