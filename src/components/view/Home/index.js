import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { authAction } from "../../../store/action";
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from './../../../graphql/mutations';
import { listTodos } from './../../../graphql/queries';
import { Formik, Form, Field, ErrorMessage } from "formik";
import TodoFormValidation from "./Validation";
import { toast } from 'react-toastify'

export default function Home() {
    const dispatch = useDispatch();
    const [todos, setTodos] = useState([])

    useEffect(() => {
        API.graphql(graphqlOperation(listTodos))
            .then(({ data }) => {
                setTodos(data['listTodos']['items'])
            })
            .catch((err) => {
                debugger
                toast.error(err.message)
            })
    })

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', height: 70, background: '#eaeaea', padding: '0 15px', alignItems: 'center' }}>
                <h2>Todo's</h2>
                <button onClick={() => dispatch(authAction.logout())}>logout</button>
            </div>

            <CreateTodoForm />

            <div>
                <ul>
                    {
                        todos.map((todo) => {
                            return (
                                <li>{todo.name} {todo.description ? `- ${todo.description}` : ''}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    );
}

const CreateTodoForm = () => (
    <div
        style={{ display: 'flex', justifyContent: 'center', background: '#ccc', padding: '15px', alignItems: 'center' }}
    >
        <Formik
            initialValues={{
                name: "",
                description: "",
            }}
            validationSchema={TodoFormValidation}
            onSubmit={(values, { resetForm, setStatus, setSubmitting }) => {
                return API.graphql(graphqlOperation(createTodo, { input: { ...values } }))
                    .then((data) => {
                        toast.success('Create Todo Success!');
                        resetForm({})
                        setStatus({ success: true })
                        setSubmitting(false);
                    })
                    .catch((err) => {
                        toast.error(`Create Todo Error!, ${err.errors[0]['message']}`);
                        setStatus({ success: false })
                        setSubmitting(false);
                    })
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div style={{ display: 'flex' }}>
                        <Field type="name" name="name" placeholder="name" />
                        <ErrorMessage component="div" name="name" className="invalid-feedback" />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Field type="description" name="description" placeholder="description" />
                        <ErrorMessage component="div" name="description" className="invalid-feedback" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>{'Create Todo'}</button>
                </Form>
            )}
        </Formik>
    </div>
)
