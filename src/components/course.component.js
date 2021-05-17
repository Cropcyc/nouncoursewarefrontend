import React, { Component} from 'react'
import CourseDataService from '../services/course.service'

export default class Course extends Component {
    constructor(props) {
        super(props)
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeCourseDetail = this.onChangeCourseDetail.bind(this)
        this.getCourse = this.getCourse.bind(this)
        this.updatePublished = this.updatePublished.bind(this)
        this.updateCourse = this.updateCourse.bind(this)
        this.deleteCourse = this.deleteCourse.bind(this)

        this.state = {
            currentCourse: {
                id: null,
                title: '',
                courseDetail: '',
                published: false
            },
            message: ''
        }
    }

        componentDidMount() {
            this.getCourse(this.props.match.params.id)
        }

        onChangeTitle(e) {
            const title = e.target.value

            this.setState(prevState => {
                return {
                    currentCourse: {
                        ...prevState.currentCourse,
                        title: title
                    }
                }
            })
        }

        onChangeCourseDetail(e) {
            const courseDetail = e.target.value

            this.setState(prevState => ({
                currentCourse: {
                    ...prevState.currentCourse,
                    courseDetail: courseDetail
                }
            }))
        }

        getCourse(id) {
            CourseDataService.get(id)
                .then(response => {
                    this.setState({
                        currentCourse: response.data
                    })
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
        }

        updatePublished(status) {
            let data = {
                id: this.state.currentCourse.id,
                title: this.state.currentCourse.title,
                courseDetail: this.state.currentCourse.courseDetail,
                published: status
            }

            CourseDataService.update(this.state.currentCourse.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentCourse: {
                        ...prevState.currentCourse,
                        published: status
                    }
                }))
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
        }

        updateCourse() {
            CourseDataService.update(
                this.state.currentCourse.id,
                this.state.currentCourse
            )
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        message: 'Course update successful'
                    })
                })
                .catch(e => {
                    console.log(e)
                })
        }

        deleteCourse() {
            const result = window.confirm('This course will be permanently deleted')
            result &&
            CourseDataService.delete(this.state.currentCourse.id)
                .then(response => {
                    console.log(response.data)
                    this.props.history.push('/courses')
                })
                .catch(e => {
                    console.log(e.message)
                    window.alert(e.message)
                })
        }

        render() {
            const { currentCourse } = this.state

            return (
                <div>
                    {currentCourse ? (
                        <div className='edit-form'>
                            <h4>Course</h4>
                            <form>
                                <div className='form-group'>
                                    <label htmlFor='title'>Title</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='title'
                                        value={currentCourse.title}
                                        onChange='this.onChangeTitle'
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='courseDetail'>Description</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='courseDetail'
                                        value={currentCourse.courseDetail}
                                        onChange={this.onChangeCourseDetail}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>
                                        <strong>Status:</strong>
                                    </label>
                                    {currentCourse.published ? 'Published' : 'Pending'}
                                </div>
                            </form>

                            {currentCourse.published ? (
                                <button
                                    className='badge badge-primary mr-2'
                                    onClick={() => this.updatePublished(false)}
                                >
                                    Unpublish
                                </button>
                            ) : (
                                <button
                                    className='badge badge-primary mr-2'
                                    onClick={() => this.updatePublished(true)}
                                >
                                    Publish
                                </button>
                            )}

                            <button
                                className='badge badge-danger mr-2'
                                onClick={this.deleteCourse}
                            >
                                Delete
                            </button>

                            <button
                                type='submit'
                                className='badge badge-success'
                                onClick={this.updateCourse}
                            >
                                Update
                            </button>
                            <p>{this.state.message}</p>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p> Select a course</p>
                        </div>
                    )}
                </div>
            )
        }
}
