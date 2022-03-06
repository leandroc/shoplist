import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ListSearchComponent() {
  return (
    <Form>
      <Row>
        <Col>
          <Form.Control
            id="list.name"
            data-testid="list.name"
            type="search"
            placeholder="Search by list name"
            aria-label="Search by list name"
          />
        </Col>

        <Col xs="auto">
          <Button>Create a new list</Button>
        </Col>
      </Row>
    </Form>
  );
}

export const ListSearch = ListSearchComponent;
