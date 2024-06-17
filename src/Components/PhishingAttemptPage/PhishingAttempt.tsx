import { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useAuth } from '../../ContextApi/context.api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from '../Spinner/spinner';

export function PhishingAttempt() {
    const [email, setEmail] = useState('');
    const [content, setContent] = useState(`<h1>This is a notification from admin about phishing attempt<h1> <h4> http://localhost:8000/phishing-attempts/$$$itemID (hint: $$$itemID will be a id of current phishing attempt)</h4>`);
    const [list, setList] = useState<any>();
    const [loading, setLoading] = useState(true);
    const context = useAuth();

    useEffect(() => {
        const listOfAttempts = async () => {
            try {
                const result = await context?.apiService.listOfNotifByCurrentAdmin();
                setList(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        listOfAttempts();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!email.trim() || !content.trim()) {
            toast.error('Please fill out both email and content fields.');
            return;
        }
        setLoading(true); // Set loading to true before API call

        try {
            const result = await context?.apiService.sendEmailNotif(email, content);

            if (result.error) {
                toast.error('Something Went Wrong');
            } else {
                toast.success('Success!');
                setContent('');
                setEmail('');
            }
        } catch (error) {
            toast.error('Error occurred while sending email notification');
        } finally {
            setLoading(false); // Set loading to false after API call completes
        }
    };

    return (

        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h1>Email Form</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter your message here"
                                value={content}
                                defaultValue={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>

                    {list && list.length > 0 && (

                        <Table striped bordered hover className="mt-4">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Body</th>
                                    <th>Is Clicked</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td>{item.username}</td>
                                        <td>{item.content}</td>
                                        <td>{item.isClicked ? 'Clicked' : 'Not Clicked'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>

    );
}
