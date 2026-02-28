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
			className={`flex flex-col gap-4 py-6 border-b border-border/40 group relative transition-all ${isDragging ? 'opacity-50 ring-2 ring-primary border-transparent rounded-xl p-6 bg-background/50' : ''} last:border-b-0`}
		>
			<div className="flex items-start gap-4 pr-8">
				<div 
					{...attributes} 
					{...listeners} 
					className="mt-2.5 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-40 transition-opacity flex-shrink-0"
				>
					<GripVertical className="w-4 h-4" />
				</div>
				<div className="flex-1 grid sm:grid-cols-12 gap-x-6 gap-y-4">
					<div className="sm:col-span-4 space-y-1.5">
						<Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Field Label</Label>
						<Input 
							className="h-10 bg-transparent border-t-0 border-x-0 border-b border-border/40 rounded-none px-0 text-sm focus-visible:ring-0 focus-visible:border-primary transition-colors"
							value={field.label}
							onChange={(e) => updateField(field.name || field.id || "unnamed", { label: e.target.value })}
						/>
					</div>
					<div className="sm:col-span-3 space-y-1.5">
						<Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Type</Label>
						<div className="relative">
							<select 
								className="w-full h-10 bg-transparent border-t-0 border-x-0 border-b border-border/40 rounded-none text-sm appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer"
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
								<option value="email">Email</option>
								<option value="textarea">Long Text</option>
								<option value="number">Number</option>
								<option value="radio">Single Choice</option>
								<option value="checkbox">Multiple Choice</option>
								<option value="select">Dropdown</option>
							</select>
						</div>
					</div>
					<div className="sm:col-span-3 space-y-1.5">
						<Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Placeholder</Label>
						<Input 
							className="h-10 bg-transparent border-t-0 border-x-0 border-b border-border/40 rounded-none px-0 text-sm focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-muted-foreground/30"
							placeholder="Optional"
							value={field.placeholder || ""}
							onChange={(e) => updateField(field.name || field.id || "unnamed", { placeholder: e.target.value })}
						/>
					</div>
					<div className="sm:col-span-2 flex items-center justify-end gap-3 pt-6">
						<div className="flex items-center gap-2">
							<span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right w-8">Req</span>
							<Switch 
								checked={field.required} 
								onCheckedChange={(val) => updateField(field.name || field.id || "unnamed", { required: val })}
								className="scale-90"
							/>
						</div>
					</div>
				</div>

				<button 
					className="text-muted-foreground/30 hover:text-destructive absolute top-12 right-0 md:-right-8 opacity-0 group-hover:opacity-100 transition-all p-2 -my-2"
					onClick={() => removeField(field.name || field.id || "unnamed")}
				>
					<Trash2 className="w-4 h-4" />
				</button>
			</div>

			{/* Options for Multi-choice fields */}
			{["radio", "checkbox", "select"].includes(field.type) && (
				<div className="ml-8 md:ml-10 pt-2 pb-2">
					<div className="flex flex-col gap-2 bg-muted/30 p-4 rounded-xl">
						<div className="flex items-center gap-2">
							<Settings2 className="w-3.5 h-3.5 text-muted-foreground/50" />
							<Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Options <span className="opacity-50 lowercase font-medium tracking-normal">(comma separated)</span></Label>
						</div>
						<Input 
							placeholder="Option 1, Option 2, Option 3"
							className="h-10 bg-transparent border-t-0 border-x-0 border-b border-border/40 rounded-none px-0 text-sm focus-visible:ring-0 focus-visible:border-primary transition-colors"
							value={field.options?.join(", ") || ""}
							onChange={(e) => updateField(field.name, { 
								options: e.target.value.split(",").map(s => s.trim()).filter(s => s !== "") 
							})}
						/>
					</div>
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
							
							<div className="grid gap-8 pt-4">
								<div className="grid gap-8">
									<div className="grid sm:grid-cols-2 gap-8 md:gap-12">
										<div className="space-y-4">
											<Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Form Style</Label>
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

										<div className="space-y-4">
											<Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Theme Color</Label>
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
								<div className="space-y-2 mt-4">
									<Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Header Image URL <span className="opacity-50 lowercase font-medium tracking-normal">(optional)</span></Label>
									<div className="flex items-end gap-4 relative">
										<Input 
											placeholder="https://example.com/banner.jpg"
											className="h-10 bg-transparent border-t-0 border-x-0 border-b border-border/40 rounded-none px-0 text-sm focus-visible:ring-0 focus-visible:border-primary transition-colors flex-1"
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
									<p className="text-[10px] text-muted-foreground pt-1">Standard form header aspect ratio is about 4:1 (e.g., 1600x400).</p>
								</div>
							</div>
						</div>

						{/* Basic Info */}
						<div className="space-y-6">
							<h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
								2. Basic Information
								<Separator className="flex-1" />
							</h3>
							
							<div className="grid gap-10 pt-4">
								<div className="space-y-2">
									<Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Form Description <span className="opacity-50 lowercase font-medium tracking-normal">(optional)</span></Label>
									<Textarea 
										placeholder="Tell your users what this form is for..."
										className="bg-transparent border-t-0 border-x-0 border-b border-border/40 rounded-none px-0 min-h-[60px] text-sm focus-visible:ring-0 focus-visible:border-primary transition-colors resize-none py-2"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>
								
								<div className="grid sm:grid-cols-2 gap-8 md:gap-12">
									<div className="space-y-2">
										<Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Submit Button Text</Label>
										<Input 
											placeholder="e.g. Join Beta"
											className="h-10 bg-transparent border-t-0 border-x-0 border-b border-border/40 rounded-none px-0 text-sm focus-visible:ring-0 focus-visible:border-primary transition-colors font-medium"
											value={buttonText}
											onChange={(e) => setButtonText(e.target.value)}
										/>
									</div>
									<div className="space-y-3">
										<Label className="text-xs font-black uppercase tracking-widest opacity-60">Success Message</Label>
										<Input 
											placeholder="e.g. Thanks for joining!"
											className="h-10 bg-transparent border-t-0 border-x-0 border-b border-border/40 rounded-none px-0 text-sm focus-visible:ring-0 focus-visible:border-primary transition-colors font-medium"
											value={successMessage}
											onChange={(e) => setSuccessMessage(e.target.value)}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Form Fields */}
						<div className="space-y-6">
							<div className="flex items-center justify-between pb-2">
								<h3 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
									3. Form Fields
								</h3>
								<button 
									className="text-[11px] font-black uppercase tracking-widest text-primary hover:text-foreground flex items-center transition-colors active:scale-95"
									onClick={addField}
								>
									<Plus className="w-3.5 h-3.5 mr-1.5" />
									Add Field
								</button>
							</div>

							<div className="space-y-4">
								{fields.length === 0 ? (
									<div className="py-12 flex flex-col items-center justify-center text-center bg-muted/10 rounded-2xl border border-border/40">
										<p className="text-xs font-medium text-muted-foreground mb-3">Your form currently has no input fields.</p>
										<button 
											className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-foreground transition-colors py-2 px-4 bg-primary/5 hover:bg-primary/10 rounded-full" 
											onClick={addField}
										>
											Start Building
										</button>
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
