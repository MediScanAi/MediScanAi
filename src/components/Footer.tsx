import { Col, Row, Typography } from 'antd';

const { Text, Link } = Typography;

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'white',
            padding: '24px 0',
            marginTop: 'auto',
            borderTop: '1px solid #e8e8e8',
        }}>
            <Row justify="space-around" align="middle">
                <Col xs={24} sm={8} style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <Text style={{ color: 'black' }}>© 2025 Your AI Doctor.</Text>
                    <Text style={{marginLeft:10}}> All rights reserved.</Text>
                </Col>
                <Col xs={24} sm={8} style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <Link href="/" style={{ color: 'black', margin: '0 8px' }}>
                        About US
                    </Link>
                    <Link href="/" style={{ color: 'black', margin: '0 8px' }}>
                        Contacts
                    </Link>
                    <Link href="/" style={{ color: 'black', margin: '0 8px' }}>
                        Support
                    </Link>

                </Col>
            </Row>
        </footer>
    )
}
export {Footer};