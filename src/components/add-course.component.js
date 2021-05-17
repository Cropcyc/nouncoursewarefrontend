import React, { Component } from 'react'
import CourseDataService from '../services/course.service'

export default class AddCourse extends Component {
    constructor(props) {
            super(props)
            this.onChangeTitle = this.onChangeTitle.bind(this)
            this.onChangeCourseDetail = this.onChangeCourseDetail.bind(this)
            this.saveCourse = this.saveCourse.bind(this)
            this.newCourse = this.newCourse.bind(this)

            this.state = {
                id: null,
                title: '',
                courseDetail: '',
                published: false,
                submitted: false,
            }
        }

        onChangeTitle(e) {
            this.setState({
                title: e.target.value
            })
        }

        onChangeCourseDetail(e) {
            this.setState({
                courseDetail: e.target.value
            })
        }
        
        saveCourse() {
            let data = {
                title: this.state.title,
                courseDetail: this.state.courseDetail
            }

            CourseDataService.create(data)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        courseDetail: response.data.courseDetail,
                        published: response.data.published,
                        submitted: true
                    })
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e.message)
                    window.alert(e.message)
                })
        }

        newCourse(){
            this.setState({
                id: null,
                title: '',
                courseDetail: '',
                published: false,
                submitted: false
            })
        }

        render(){
            return (
               <div className='submit-form'>
                   {this.state.submitted ? (
                       <div>
                           <h4>Successfully Added Course Material</h4>
                           <button className='btn btn-success' onClick={this.newCourse}>
                               Add Course Material
                           </button>
                        </div>
                   ) : (
                       <div>
                           <div className='form-group'>
                               <label htmlFor='title'>Title</label>
                               <input
                                    type='text'
                                    className='form-control'
                                    id='title'
                                    required
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    name='title'
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='courseDetail'>Course Detail</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='courseDetail'
                                    required
                                    value={this.state.courseDetail}
                                    onChange={this.onChangeCourseDetail}
                                    name='courseDetail'
                                />
                            </div>

                            {/* <div className='form-group'>
                                <input
                                    type='file'
                                    className='form-control'
                                    id='foo'
                                    value={this.state.uploadedfile}
                                    onChange={this.onChangeFoo}
                                    name='foo'
                                />
                            </div> */}

                            <button onClick={this.saveCourse} className='btn btn-success'>
                                Submit
                            </button>
                        </div>
                   )}
               </div> 
            )
        }
}