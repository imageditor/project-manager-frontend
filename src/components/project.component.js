import React, { Component } from "react";
import ProjectDataService from "../services/project.service";
import ImagesList from "../components/images-list.component";

export default class Project extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getProject = this.getProject.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);

        this.state = {
            currentProject: {
                id: this.props.match.params.id,
                title: "",
                description: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getProject(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentProject: {
                    ...prevState.currentProject,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentProject: {
                ...prevState.currentProject,
                description: description
            }
        }));
    }

    getProject(id) {
        ProjectDataService.get(id)
            .then(response => {
                this.setState({
                    currentProject: response.data,
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateProject() {
        ProjectDataService.update(
            this.state.currentProject.id,
            this.state.currentProject
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The project was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteProject() {
        ProjectDataService.delete(this.state.currentProject.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/projects')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentProject } = this.state;
        const projectId = this.props.match.params.id;

        return (
            <div>
                { currentProject ? (
                    <div className="edit-form">
                        <h4>Project</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentProject.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentProject.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                        </form>

                        <button
                            className="badge bg-danger mr-2"
                            onClick={this.deleteProject}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge bg-success"
                            onClick={this.updateProject}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                        <div>
                            <ImagesList projectId={projectId} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Project...</p>
                    </div>
                )}
            </div>
        );
    }
}