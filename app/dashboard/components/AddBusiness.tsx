import { ControlledInput } from "@/components/UI/Inputs/ControlledInput";
import Popup from "@/components/UI/Popup";

import { Button } from "@/components/UI/button";

export default async function () {
  return (
    <Popup trigger={<Button>+</Button>} title="Add new Business">
      <ControlledInput />
    </Popup>
  );
}
