import { FC } from "react";

import { SetupMainPlotForm } from "@/forms/SetupMainPlotForm";
import { toLocalString } from "@/lib";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface ISetUserMainPlotDialogProps {
  children: React.ReactNode;
  plotNum?: number;
  referralBoost: number;
}

export const SetUserMainPlotDialog: FC<ISetUserMainPlotDialogProps> = ({ children, plotNum, referralBoost }) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="z-50">
      <DialogHeader>
        <DialogTitle>Set up main plot</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Select your plot that will increase its matching area (by {toLocalString(referralBoost * 100)}% of the total area of all plots in the City) when
        your user referral link is being used.
      </DialogDescription>
      <SetupMainPlotForm plotNum={plotNum} />
    </DialogContent>
  </Dialog>
);

