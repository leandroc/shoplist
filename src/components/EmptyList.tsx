import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import EmptyListImage from '../assets/NoDocuments.svg';

function EmptyListComponent() {
  return (
    <div className="text-center pt-5">
      <h2 className="pb-3">Nothing here :/</h2>

      <div className="pb-5">
        <Image src={EmptyListImage} alt="" />
      </div>

      <Button size="lg">Start with a new list</Button>
    </div>
  );
}

export const EmptyList = EmptyListComponent;
