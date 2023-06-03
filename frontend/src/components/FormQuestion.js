import Button from '@/components/Button'
import axios from "@/lib/axios";
import {mutate} from "swr";
import Label from "@/components/Label";
import Input from "@/components/Input";

import {useState} from "react";

const submitForm = async event => {
    event.preventDefault()

    await sqndQuery({
        a: 21
    })
}

const csrf = () => axios.get('/sanctum/csrf-cookie')

const sqndQuery = async ({ setErrors, setStatus, ...props }) => {
    // const csrf = () => axios.get('/sanctum/csrf-cookie')

    await csrf();

    // setErrors([])
    // setStatus(null)

    axios
        .get('http://localhost:8000/api/get-answer', props)
        .then(() => mutate('answer'))
        .catch(error => {
            if (error.response.status !== 422) throw error

            console.log(error)
        })
}

const FormQuestion = ({ id, className, ...props }) => {

    const [question, setQuestion] = useState('');

    return (

        <form
            onSubmit={submitForm}
            className={`${className} inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
            {...props}
        >
            <div>
                <Label htmlFor="question">Вопрос:</Label>

                <Input
                    id="question"
                    type="text"
                    value={question}
                    className="block mt-1 w-full"
                    onChange={event => setQuestion(event.target.value)}
                    required
                    autoFocus
                />

            </div>
            <Button className="ml-3">Отправить</Button>
        </form>
    )
}

export default FormQuestion
