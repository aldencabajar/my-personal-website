import React from "react";
import ProjectsDesc from "./ProjectsDesc.js"

class WorkExperience extends React.Component {
    constructor(props){
        super(props)
        this.data = this.props.data
    }
    componentDidMount() {
        console.log(this.DerivePrefixId(this.data[0].job_title, 0))
    }

    DerivePrefixId=(stri, num)=>{
        return( (stri + num.toString()).toLowerCase().replace(" ", "-") )
    }

    UnravelData=(data)=>{
        return(
        data.map((doc)=>{
            return(
            <div className="work-exp-cell">
                <div className="work-exp-content">
                    <header>
                        <h1>{doc.job_title}</h1>
                        <h3>{doc.description}</h3>
                    </header>
                    <ul className="work-exp-content list">
                        {doc.projects.map((proj, i)=>{
                            return(
                            typeof proj.description == "undefined" ? 
                            <li>{proj.title}</li> : 
                            <ProjectsDesc title={proj.title}
                            desc={proj.description}
                            id={this.DerivePrefixId(doc.job_title, i)}/>
                            )
                        })}
                    </ul>
                </div>
                <div className="work-exp-date">
                    {doc.timeline}
                </div>
            </div>
            )
        })
        )

    }

    render() {
        return(
            <div className="work-exp">
                <header className="resume-header">
                    <h3>Work Experience</h3>
                </header>
                {this.UnravelData(this.data)}
            </div>
        )
    }

}
export default WorkExperience
