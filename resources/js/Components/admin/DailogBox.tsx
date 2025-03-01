import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { FormEventHandler } from "react";

export default function DialogDemo({ btnName }: { btnName: string }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({ col_number: "" });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("add-website-colume.store"), {
            onFinish: () => reset("col_number"),
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#e67e22] text-white py-2 max-md:py-2 max-md:px-2 max-md:text-sm rounded-lg hover:bg-[#d35400] px-3">
                    {btnName}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Set Colume Number</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                            id="name"
                            type="number"
                            onChange={(e) =>
                                setData("col_number", e.target.value)
                            }
                            className="col-span-12"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={submit}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
