import { Button, DatePicker, Descriptions, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

function MainTests() {
  const navigate = useNavigate();
  return (
    <div>
      <Descriptions title="Tests" bordered column={1}>
        <Descriptions.Item
          style={{ textAlign: 'center' }}
          label="Blood | Urine | Vitamin | Genetic test"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              onClick={() => navigate('/tests-form/blood-test')}
              type="primary"
              style={{ marginRight: 50, width: 250 }}
            >
              Input tests
            </Button>
            &nbsp;
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DatePicker />
              &nbsp;
              <Typography.Text style={{ fontWeight: 'lighter' }}>
                Last updated:
              </Typography.Text>
            </div>
          </div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default MainTests;
