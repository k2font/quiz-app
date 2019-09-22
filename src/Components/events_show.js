import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import NavigationBar from './NavigationBar'

import { getEvent, deleteEvent, putEvent } from '../Actions'

class EventsShow extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
    }

    componentDidMount() {
      const { id } = this.props.match.params
      if(id) {
        this.props.getEvent(id)
      }
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

    async onDeleteClick() {
      const { id } = this.props.match.params
      await this.props.deleteEvent(id)
      this.props.history.push('/events')
    }

    // asyncの復習を行う
    async onSubmit(values) {
        await this.props.putEvent(values)
        this.props.history.push('/events')
    }

    render () {
        // pristine: ユーザの入力状態をtrue / falseで管理
        // submitting: submitしたらtrueになる変数
        // TODO: ドキュメント読む
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
                        <Link to="/events" onClick={this.onDeleteClick}>Delete</Link>
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

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
}

const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)
)