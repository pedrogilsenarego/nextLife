import { Input } from "@/components/UI/Input";
import Popup from "@/components/UI/Popup";

import { Button } from "@/components/UI/button";

export default async function () {
  return (
    <Popup trigger={<Button>+</Button>} title="Add new Business">
      <Input placeholder="Name" />
    </Popup>
  );
}
