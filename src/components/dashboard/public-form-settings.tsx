"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
	Plus, 
	Trash2, 
	GripVertical, 
	Link as LinkIcon, 
	Globe, 
	CheckCircle2,
	Eye,
	X,
	Settings2
} from "lucide-react";
import { updateForm } from "@/db/actions/form.actions";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface PublicFormField {
	label: string;
	name: string;
	id?: string;
	type: "text" | "email" | "textarea" | "number" | "radio" | "checkbox" | "select";
	required: boolean;
	placeholder?: string;
	options?: string[];
}

interface PublicFormSettingsProps {
	form: any;
	userId: string;
}

function SortableField({ 
	field, 
	updateField, 
	removeField 
}: { 
	field: PublicFormField; 
	updateField: (name: string, data: Partial<PublicFormField>) => void;
	removeField: (name: string) => void;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: field.name || field.id || "unnamed" });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 50 : 0,
	};

	return (
		<div 
			ref={setNodeRef} 
			style={style} 
			className={`flex flex-col gap-4 p-5 bg-background border border-border/60 rounded-xl group relative shadow-sm hover:shadow-md transition-shadow ${isDragging ? 'opacity-50 ring-2 ring-primary border-primary' : ''}`}
		>
			<div className="flex items-start gap-4 pr-10">
				<div 
					{...attributes} 
					{...listeners} 
					className="mt-2.5 cursor-grab active:cursor-grabbing opacity-30 group-hover:opacity-100 transition-opacity"
				>
					<GripVertical className="w-4 h-4" />
				</div>
				<div className="flex-1 grid sm:grid-cols-12 gap-4">
					<div className="sm:col-span-4 space-y-1.5">
						<Label className="text-[10px] font-black uppercase tracking-tighter opacity-50">Field Label</Label>
						<Input 
							className="h-9 bg-muted/20 border-border/40 text-sm rounded-lg"
							value={field.label}
							onChange={(e) => updateField(field.name || field.id || "unnamed", { label: e.target.value })}
						/>
					</div>
					<div className="sm:col-span-3 space-y-1.5">
						<Label className="text-[10px] font-black uppercase tracking-tighter opacity-50">Type</Label>
						<select 
							className="w-full h-9 bg-muted/20 border border-border/40 rounded-lg px-3 text-sm focus:ring-1 focus:ring-primary outline-none"
							value={field.type}
							onChange={(e) => {
								const newType = e.target.value as any;
								const updates: Partial<PublicFormField> = { type: newType };
								// Initialize options if switching to a multi-choice type
								if (["radio", "checkbox", "select"].includes(newType) && (!field.options || field.options.length === 0)) {
									updates.options = ["Option 1", "Option 2"];
								}
								updateField(field.name || field.id || "unnamed", updates);
							}}
						>
							<option value="text">Short Text</option>
							<option value="email">Email Address</option>
							<option value="textarea">Long Text (Textarea)</option>
							<option value="number">Number</option>
							<option value="radio">Single Choice (Radio)</option>
							<option value="checkbox">Multiple Choice (Checkbox)</option>
							<option value="select">Dropdown (Select)</option>
						</select>
					</div>
					<div className="sm:col-span-3 space-y-1.5">
						<Label className="text-[10px] font-black uppercase tracking-tighter opacity-50">Placeholder</Label>
						<Input 
							className="h-9 bg-muted/20 border-border/40 text-sm rounded-lg"
							placeholder="e.g. Enter your name"
							value={field.placeholder || ""}
							onChange={(e) => updateField(field.name || field.id || "unnamed", { placeholder: e.target.value })}
						/>
					</div>
					<div className="sm:col-span-2 flex items-center gap-2 pt-6">
						<Switch 
							checked={field.required} 
							onCheckedChange={(val) => updateField(field.name || field.id || "unnamed", { required: val })}
						/>
						<span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Req</span>
					</div>
				</div>

				<Button 
					variant="ghost" 
					size="icon" 
					className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 absolute right-3 top-6 opacity-30 group-hover:opacity-100 transition-opacity"
					onClick={() => removeField(field.name || field.id || "unnamed")}
				>
					<Trash2 className="w-3.5 h-3.5" />
				</Button>
			</div>

			{/* Options for Multi-choice fields */}
			{["radio", "checkbox", "select"].includes(field.type) && (
				<div className="ml-8 pt-4 border-t border-border/40 space-y-3">
					<div className="flex items-center gap-2">
						<Settings2 className="w-3 h-3 text-muted-foreground" />
						<Label className="text-[10px] font-black uppercase tracking-tighter opacity-70">Options (Comma separated)</Label>
					</div>
					<Input 
						placeholder="Option 1, Option 2, Option 3"
						className="h-9 bg-muted/20 border-border/40 text-xs rounded-lg"
						value={field.options?.join(", ") || ""}
						onChange={(e) => updateField(field.name, { 
							options: e.target.value.split(",").map(s => s.trim()).filter(s => s !== "") 
						})}
					/>
				</div>
			)}
		</div>
	);
}

export function PublicFormSettings({ form, userId }: PublicFormSettingsProps) {
	const router = useRouter();
	const [updating, setUpdating] = useState(false);
	
	// Local state for the settings
	const [isPublic, setIsPublic] = useState(form.isPublic);
	const [description, setDescription] = useState(form.publicFormDescription || "");
	const [fields, setFields] = useState<PublicFormField[]>(form.publicFormFields || []);
	const [successMessage, setSuccessMessage] = useState(form.publicFormSuccessMessage || "");
	const [buttonText, setButtonText] = useState(form.publicFormButtonText || "Submit");
	const [headerImage, setHeaderImage] = useState(form.publicFormHeaderImage || "");
	const [themeColor, setThemeColor] = useState(form.publicFormThemeColor || "#6366f1");
	const [formStyle, setFormStyle] = useState(form.publicFormStyle || "default");
	const [isCustomColor, setIsCustomColor] = useState(false);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/share/${form.endpointId}` : "";

	const themeColors = [
		{ name: "Indigo", value: "#6366f1" },
		{ name: "Red", value: "#ef4444" },
		{ name: "Green", value: "#22c55e" },
		{ name: "Sky", value: "#0ea5e9" },
		{ name: "Amber", value: "#f59e0b" },
		{ name: "Violet", value: "#8b5cf6" },
		{ name: "Pink", value: "#ec4899" },
		{ name: "Sage", value: "#4d7c0f" },
	];

	async function handleSave() {
		setUpdating(true);
		try {
			const success = await updateForm(form.id, userId, {
				isPublic,
				publicFormDescription: description,
				publicFormFields: fields,
				publicFormSuccessMessage: successMessage,
				publicFormButtonText: buttonText,
				publicFormHeaderImage: headerImage,
				publicFormThemeColor: themeColor,
				publicFormStyle: formStyle,
			});

			if (success) {
				toast.success("Public form settings updated!");
				router.refresh();
			} else {
				toast.error("Failed to update settings.");
			}
		} catch (error) {
			toast.error("Something went wrong.");
		} finally {
			setUpdating(false);
		}
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			setFields((items) => {
				const oldIndex = items.findIndex((i) => (i.name || i.id || "unnamed") === active.id);
				const newIndex = items.findIndex((i) => (i.name || i.id || "unnamed") === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}

	function addField() {
		const newField: PublicFormField = {
			label: "New Field",
			name: `field_${Date.now()}`,
			type: "text",
			required: false,
			placeholder: "",
		};
		setFields([...fields, newField]);
	}

	function removeField(name: string) {
		setFields(fields.filter(f => (f.name || f.id || "unnamed") !== name));
	}

	function updateField(name: string, data: Partial<PublicFormField>) {
		setFields(fields.map(f => (f.name || f.id || "unnamed") === name ? { ...f, ...data } : f));
	}

	return (
		<div className="space-y-8">
			<Card className="border-border/40 shadow-none overflow-hidden rounded-2xl">
				<CardHeader className="bg-muted/30 border-b border-border/40 p-6 md:p-8">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<div className="flex items-center gap-4">
							<div className={`p-2.5 rounded-xl transition-colors ${isPublic ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
								<Globe className="w-5 h-5" />
							</div>
							<div>
								<CardTitle className="text-xl font-black tracking-tight">Public Form Page</CardTitle>
								<CardDescription className="text-xs font-medium">Host a standalone form page on FormGuard.</CardDescription>
							</div>
						</div>
						<div className="flex items-center gap-3 bg-background/50 border border-border/40 p-1.5 rounded-xl px-4">
							<span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status:</span>
							<Badge variant={isPublic ? "default" : "secondary"} className="text-[10px] font-mono px-2 py-0 h-5">
								{isPublic ? "LIVE" : "DISABLED"}
							</Badge>
							<Switch checked={isPublic} onCheckedChange={setIsPublic} />
						</div>
					</div>
				</CardHeader>
				
				<CardContent className="p-0">
					{isPublic && (
						<div className="bg-primary/5 p-4 md:px-8 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
							<div className="flex items-center gap-3 truncate">
								<LinkIcon className="w-4 h-4 text-primary shrink-0" />
								<p className="text-xs font-mono text-primary font-bold truncate">{publicUrl}</p>
							</div>
							<div className="flex items-center gap-2 shrink-0">
								<Button 
									variant="outline" 
									size="sm" 
									className="h-8 text-[10px] font-black uppercase tracking-widest border-primary/20 hover:bg-primary/10"
									onClick={() => {
										navigator.clipboard.writeText(publicUrl);
										toast.success("URL copied!");
									}}
								>
									Copy Link
								</Button>
								<Button 
									variant="default" 
									size="sm" 
									className="h-8 text-[10px] font-black uppercase tracking-widest"
									asChild
								>
									<a href={publicUrl} target="_blank" rel="noopener noreferrer">
										<Eye className="w-3 h-3 mr-1.5" />
										Preview
									</a>
								</Button>
							</div>
						</div>
					)}

					<div className="p-6 md:p-8 space-y-10">
						{/* Theme Customization */}
						<div className="space-y-6">
							<h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
								1. Theme & Appearance
								<Separator className="flex-1" />
							</h3>
							
							<div className="grid gap-8 p-6 bg-muted/20 border border-border/40 rounded-2xl">
								<div className="grid gap-6">
									<div className="grid sm:grid-cols-2 gap-6">
										<div className="space-y-3">
											<Label className="text-xs font-black uppercase tracking-widest opacity-60">Form Style</Label>
											<Select value={formStyle} onValueChange={setFormStyle}>
												<SelectTrigger className="bg-background border-border/40 h-11 rounded-xl focus:ring-primary/20">
													<SelectValue placeholder="Select a style" />
												</SelectTrigger>
												<SelectContent className="rounded-xl font-medium">
													<SelectItem value="default">Default (Cards & Shadows)</SelectItem>
													<SelectItem value="minimal">Minimal (Clean & Flat)</SelectItem>
													<SelectItem value="notion">Notion (Serif & Borders)</SelectItem>
													<SelectItem value="playful">Playful (Large & Bold)</SelectItem>
													<SelectItem value="terminal">Terminal (Hacker vibe)</SelectItem>
													<SelectItem value="typeform">Typeform (One at a time)</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div className="space-y-3">
											<Label className="text-xs font-black uppercase tracking-widest opacity-60">Theme Color</Label>
											<div className="flex flex-wrap gap-2">
												{themeColors.map((color) => (
													<button
														key={color.value}
														type="button"
														className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center ${themeColor === color.value ? 'border-foreground ring-2 ring-primary/20' : 'border-transparent'}`}
														style={{ backgroundColor: color.value }}
														onClick={() => {
															setThemeColor(color.value);
															setIsCustomColor(false);
														}}
													>
														{themeColor === color.value && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
													</button>
												))}
												<div className="flex items-center gap-2">
													<div 
														className="w-10 h-10 rounded-full border-2 border-border/40 relative overflow-hidden flex items-center justify-center bg-background"
														style={{ borderColor: isCustomColor ? themeColor : undefined }}
													>
														<input 
															type="color" 
															className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
															value={themeColor}
															onChange={(e) => {
																setThemeColor(e.target.value);
																setIsCustomColor(true);
															}}
														/>
														<Plus className="w-4 h-4 text-muted-foreground" />
													</div>
													{isCustomColor && <span className="text-[10px] font-mono font-bold uppercase">{themeColor}</span>}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="space-y-3">
									<Label className="text-xs font-black uppercase tracking-widest opacity-60">Header Image URL (Optional)</Label>
									<div className="flex gap-4">
										<Input 
											placeholder="https://example.com/banner.jpg"
											className="bg-background border-border/40 h-11 rounded-xl focus:ring-primary/20 flex-1"
											value={headerImage}
											onChange={(e) => setHeaderImage(e.target.value)}
										/>
										{headerImage && (
											<Button 
												variant="outline" 
												size="icon" 
												className="h-11 w-11 rounded-xl border-border/40"
												onClick={() => setHeaderImage("")}
											>
												<X className="w-4 h-4" />
											</Button>
										)}
									</div>
									<p className="text-[10px] text-muted-foreground">Standard Google Forms header aspect ratio is about 4:1 (e.g., 1600x400).</p>
								</div>
							</div>
						</div>

						{/* Basic Info */}
						<div className="space-y-6">
							<h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
								2. Basic Information
								<Separator className="flex-1" />
							</h3>
							
							<div className="grid gap-6">
								<div className="space-y-3">
									<Label className="text-xs font-black uppercase tracking-widest opacity-60">Form Description</Label>
									<Textarea 
										placeholder="Tell your users what this form is for..."
										className="bg-muted/20 border-border/40 rounded-xl min-h-[100px] text-sm focus:ring-primary/20"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>
								
								<div className="grid sm:grid-cols-2 gap-6">
									<div className="space-y-3">
										<Label className="text-xs font-black uppercase tracking-widest opacity-60">Submit Button Text</Label>
										<Input 
											placeholder="e.g. Join Beta"
											className="bg-muted/20 border-border/40 h-11 rounded-xl focus:ring-primary/20 font-bold"
											value={buttonText}
											onChange={(e) => setButtonText(e.target.value)}
										/>
									</div>
									<div className="space-y-3">
										<Label className="text-xs font-black uppercase tracking-widest opacity-60">Success Message</Label>
										<Input 
											placeholder="e.g. Thanks for joining!"
											className="bg-muted/20 border-border/40 h-11 rounded-xl focus:ring-primary/20"
											value={successMessage}
											onChange={(e) => setSuccessMessage(e.target.value)}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Form Fields */}
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 flex-1 mr-4">
									3. Form Fields
									<Separator className="flex-1" />
								</h3>
								<Button 
									variant="outline" 
									size="sm" 
									className="h-8 rounded-xl font-bold border-primary/20 text-primary hover:bg-primary/5"
									onClick={addField}
								>
									<Plus className="w-3.5 h-3.5 mr-1.5" />
									Add Field
								</Button>
							</div>

							<div className="space-y-4">
								{fields.length === 0 ? (
									<div className="py-12 text-center bg-muted/20 rounded-2xl border-2 border-dashed border-border/40">
										<p className="text-sm text-muted-foreground">No fields added yet. Your public form will be empty.</p>
										<Button variant="link" className="text-primary font-bold mt-2" onClick={addField}>Add your first field</Button>
									</div>
								) : (
									<DndContext 
										sensors={sensors}
										collisionDetection={closestCenter}
										onDragEnd={handleDragEnd}
									>
										<SortableContext 
											items={fields.map(f => f.name || f.id || "unnamed")}
											strategy={verticalListSortingStrategy}
										>
											<div className="space-y-4">
												{fields.map((field) => (
													<SortableField 
														key={field.name || field.id || "unnamed"} 
														field={field} 
														updateField={updateField}  
														removeField={removeField} 
													/>
												))}
											</div>
										</SortableContext>
									</DndContext>
								)}
							</div>
						</div>

						<div className="pt-4">
							<Button 
								className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-sm bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-[0.98]"
								disabled={updating}
								onClick={handleSave}
							>
								{updating ? (
									<>Updating Settings...</>
								) : (
									<>
										<CheckCircle2 className="w-4 h-4 mr-2" />
										Save Public Form Settings
									</>
								)}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
