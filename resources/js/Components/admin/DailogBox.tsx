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

export default function DialogDemo({
    btnName,
    children,
    description,
}: {
    btnName: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#e67e22] text-white py-2 max-md:py-2 max-md:px-2 max-md:text-sm rounded-lg hover:bg-[#d35400] px-3">
                    {btnName}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{description}</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
