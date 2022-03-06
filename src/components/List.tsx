import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

type ListItem = {
  key: string | number;
  name: string;
  sub: string;
};

export type ListProps = {
  data: ListItem[];
  onClick?: (data: ListItem) => void;
};

type ListComponentProps = ListProps;

function ListComponent({ data, onClick }: ListComponentProps) {
  const handleOnClick = (item: ListItem) => () => {
    if (onClick) {
      onClick(item);
    }
  };

  return (
    <ListGroup aria-label="your lists" as="ul" variant="flush">
      {data.map((item) => {
        return (
          <ListGroup.Item
            key={item.key}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>
              {item.sub}
            </div>

            {!onClick ? null : <Button onClick={handleOnClick(item)}>Edit</Button>}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export const List = ListComponent;
