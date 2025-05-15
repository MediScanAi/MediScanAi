import {
    Button,
    InputNumber,
    message,
    Form,
    Card,
    Typography,
} from "antd";

import { setGeneticTestData, type GeneticTestFormValues } from "../../../app/slices/geneticTestSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
const { Title } = Typography;

const geneticFields = [
    {
        name: 'brca1',
        label: 'BRCA1 Gene Mutation',
        min: 0,
        max: 1,
        step: 0.01,
        placeholder: 'e.g. 0.12',
    },
    {
        name: 'brca2',
        label: 'BRCA2 Gene Mutation',
        min: 0,
        max: 1,
        step: 0.01,
        placeholder: 'e.g. 0.05',
    },
    {
        name: 'apoe',
        label: 'APOE Genotype Risk Score',
        min: 0,
        max: 100,
        step: 1,
        placeholder: 'e.g. 75',
    },
    {
        name: 'mthfr',
        label: 'MTHFR Mutation Level',
        min: 0,
        max: 2,
        step: 0.01,
        placeholder: 'e.g. 1.35',
    },
    {
        name: 'factor_v_leiden',
        label: 'Factor V Leiden Mutation',
        min: 0,
        max: 1,
        step: 0.01,
        placeholder: 'e.g. 0.24',
    },
    {
        name: 'cyp2c19',
        label: 'CYP2C19 Enzyme Activity',
        min: 0,
        max: 10,
        step: 0.1,
        placeholder: 'e.g. 3.5',
    },
];

function GeneticTestForm() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const data = useAppSelector(
        (state: RootState) => state.geneticTest?.geneticTestData
    );

    const onFinish = (values: GeneticTestFormValues) => {
        dispatch(setGeneticTestData(values));
        message.success({
            content: `Genetic Test & Family Health History submitted successfully!`,
            className: 'success-message',
        });
        setTimeout(() => {
            form.resetFields();
        }, 0);
    };

    console.log(data);

    return (
        <Card style={{ border: 'none' }} title={<Title level={3}>Genetic Test & Family Health History</Title>}>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                size="large"
                validateTrigger={['onBlur', 'onChange']}
            >
                <Title level={4}>Genetic Test</Title>
                <div>
                    {geneticFields.map((field) => (
                        <Form.Item
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            rules={[
                                { required: true, },
                                {
                                    type: 'number',
                                    min: field.min,
                                    max: field.max,
                                    message: `Must be between ${field.min}-${field.max}`,
                                },
                            ]}
                            validateFirst
                        >
                            <InputNumber
                                min={field.min}
                                max={field.max}
                                step={field.step}
                                style={{ width: '100%' }}
                                placeholder={field.placeholder}
                            />
                        </Form.Item>
                    ))}
                </div>

                <Form.Item style={{ textAlign: 'center', marginTop: 32 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                    >
                        Submit Form
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default GeneticTestForm;
