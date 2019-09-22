import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import NavigationBar from './NavigationBar'

import { postEvent } from '../Actions'

class EventsNew extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    // フィールドを描画する
    renderField(field) {
        const { input, label, type, meta: { touched, error } } = field

        return (
            <div>
                <input {...input} placeholder={label} type={type} />
                {touched && error && <span>{error}</span>} {/* この書き方が不明 */}
            </div>
        )
    }

    // asyncの復習を行う
    async onSubmit(values) {
        await this.props.postEvent(values)
        this.props.history.push('/events')
    }

    render () {
        // pristine: ユーザの入力状態をtrue / falseで管理
        // submitting: submitしたらtrueになる変数
        const { handleSubmit, pristine, submitting, invalid } = this.props
        return (
            <React.Fragment>
                <NavigationBar />
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div>
                        <Field label="問題" name="question" type="text" component={this.renderField} />
                    </div>

                    <div>
                        <Field label="選択肢A" name="choice1" type="text" component={this.renderField} />
                    </div>

                    <div>
                        <Field label="選択肢B" name="choice2" type="text" component={this.renderField} />
                    </div>

                    <div>
                        <Field label="選択肢C" name="choice3" type="text" component={this.renderField} />
                    </div>

                    <div>
                        <Field label="選択肢D" name="choice4" type="text" component={this.renderField} />
                    </div>

                    <div>
                        <Field label="回答" name="answer" type="text" component={this.renderField} />
                    </div>

                    <div>
                        <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
                        <Link to="/events">Cancel</Link>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

// valuesには入力されている値が渡ってくる
const validate = (values) => {
    const errors = {}

    if(!values.question) {
        errors.title = "問題を入力してください！"
    }

    if(!values.choice1) {
        errors.body = "選択肢Aを入力してください！"
    }

    if(!values.choice2) {
        errors.body = "選択肢Bを入力してください！"
    }

    if(!values.choice3) {
        errors.body = "選択肢Cを入力してください！"
    }

    if(!values.choice4) {
        errors.body = "選択肢Dを入力してください！"
    }

    if(!values.answer) {
        errors.body = "回答をアルファベット入力してください！"
    }

    return errors
}

const mapDispatchToProps = ({ postEvent })

export default connect(null, mapDispatchToProps)(
    reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
)