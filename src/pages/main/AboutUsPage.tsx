import {Row, Card, Typography, Divider, Avatar} from 'antd';
import {SmileTwoTone, TeamOutlined} from '@ant-design/icons';
import {useAppSelector} from "../../app/hooks.ts";

const {Title, Paragraph, Text} = Typography;

function AboutUsPage() {
    const theme = useAppSelector((state) => state.theme.isDarkMode);
    const team = [
        {
            name: 'Vahe Nersesyan',
            role: 'Frontend Developer & UI/UX',
            image: <SmileTwoTone style={{fontSize: '100px'}}/>,
        },
        {
            name: 'Vache Aseyan',
            role: 'Frontend Developer & UI/UX',
            image: <SmileTwoTone style={{fontSize: '100px'}}/>,
        },
        {
            name: 'David Mutafyan',
            role: 'Frontend Developer & UI/UX',
            image: <SmileTwoTone style={{fontSize: '100px'}}/>,
        },
        {
            name: 'Artur Bagramyan',
            role: 'Frontend Developer & UI/UX',
            image: <SmileTwoTone style={{fontSize: '100px'}}/>,
        },
        {
            name: 'Arayik Avagyan',
            role: 'Frontend Developer & UI/UX',
            image: <SmileTwoTone style={{fontSize: '100px'}}/>,
        },
    ];

    return (
        <div style={{backgroundColor: theme ? '#2d3748' : '',height:'100%'}}>
            <Row
                style={{
                    justifyContent: 'center',
                    backgroundColor: theme ? '#2d3748' : ''
                }}
            >
                <Card
                    style={{
                        width: '80vw',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: theme ? '#2d3748' : ''
                    }}
                >
                    <Title
                        style={{
                            textAlign: 'center',
                            color: '#3498db',
                            margin: '20px',
                        }}
                        level={2}
                    >
                        About MediScanAI
                    </Title>
                    <Paragraph style={{textAlign: 'center',color:theme?'white':'black'}}>
                        MediScanAI is an innovative health assistant platform powered by AI.
                        We aim to provide fast, secure, and intelligent healthcare support
                        to patients anytime, anywhere.
                    </Paragraph>
                    <Divider/>
                    <Title
                        style={{
                            textAlign: 'center',
                            color: '#3498db',
                            margin: '20px',
                        }}
                        level={4}
                    >
                        What We Offer
                    </Title>
                    <Paragraph style={{textAlign: 'center', columnCount: 3}}>
                        <ul style={{listStyleType: 'none',color:theme?'white':'black'}}>
                            <li>
                                <strong>AI Doctor:</strong> Chat with an AI-powered assistant to
                                get help with symptoms or health questions.
                            </li>
                            <li>
                                <strong>AI Analysis:</strong> Upload your medical test results
                                and receive smart, human-like insights.
                            </li>
                            <li>
                                <strong>Secure & Private:</strong> Your health data is never
                                shared and always encrypted.
                            </li>
                        </ul>
                    </Paragraph>
                    <Divider/>
                    <Title
                        style={{
                            textAlign: 'center',
                            color: '#3498db',
                            margin: '20px',
                        }}
                        level={4}
                    >
                        <TeamOutlined/> Our Team
                    </Title>
                    <Row
                        style={{
                            justifyContent: 'center',
                            margin: '30px',
                            gap: '20px',
                        }}
                    >
                        {team.map((member, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    fontSize: '12px',
                                    margin: '10px',
                                }}
                            >
                                <Avatar size={100} src={member.image}/>
                                <Text style={{textAlign: 'center',color:theme?'white':'black'}} strong>
                                    {member.name}
                                </Text>
                                <Paragraph style={{textAlign: 'center',color:theme?'white':'black'}}>
                                    {member.role}
                                </Paragraph>
                            </div>
                        ))}
                    </Row>
                </Card>
            </Row>
        </div>
    );
}

export default AboutUsPage;
