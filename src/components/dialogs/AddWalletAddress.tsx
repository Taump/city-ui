import cn from "classnames";
import obyte from "obyte";
import { FC, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { setWalletAddress, useSettingsStore } from "@/store/settings-store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface IAddWalletAddressProps {
  children: React.ReactNode;
}

export const AddWalletAddress: FC<IAddWalletAddressProps> = ({ children }) => {
  const [address, setAddress] = useState<null | string>(null);
  const saveBtnRef = useRef<HTMLButtonElement>(null);
  const walletAddressFromStore = useSettingsStore((state) => state.walletAddress);
  const validAddress = useMemo(() => (address ? obyte.utils.isValidAddress(address) : false), [address]);

  const disabled = useMemo(
    () => walletAddressFromStore === address || !validAddress,
    [walletAddressFromStore, address, validAddress]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(e.target.value.toUpperCase());
    },
    [setAddress]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        saveBtnRef.current?.click();
      }
    },
    [saveBtnRef.current]
  );

  const handleOpenChange = useCallback(() => {
    setTimeout(() => {
      setAddress(walletAddressFromStore);
    }, 700);
  }, [walletAddressFromStore, setAddress]);

  const save = useCallback(() => {
    if (address && !disabled) {
      setWalletAddress(address);
      toast({ title: "Wallet address saved" });
    }
  }, [address, disabled]);

  useEffect(() => {
    setAddress(walletAddressFromStore);
  }, [walletAddressFromStore]);

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {walletAddressFromStore ? <Button variant="default">{walletAddressFromStore.slice(0, 6)}...</Button> : children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add wallet</DialogTitle>
          <DialogDescription>
            <a href="https://obyte.org/#download" target="_blank" rel="noopener" className="text-link">
              Install Obyte wallet
            </a>{" "}
            if you don't have one yet, and copy/paste your address here.{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="address">Wallet address</Label>
            <Input
              id="address"
              className={cn({ "border-red-800": address && !validAddress })}
              autoComplete="false"
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              value={address || ""}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button ref={saveBtnRef} onClick={save} disabled={disabled} className="w-full">
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

