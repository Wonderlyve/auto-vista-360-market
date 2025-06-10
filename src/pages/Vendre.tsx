
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, Camera, Car, Check, Home } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Validation schema pour véhicules
const vehicleSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  description: z.string().min(20, 'La description doit contenir au moins 20 caractères'),
  price: z.string().refine(val => !isNaN(Number(val)), 'Le prix doit être un nombre'),
  year: z.string().refine(val => {
    const yearNum = Number(val);
    return !isNaN(yearNum) && yearNum >= 1900 && yearNum <= new Date().getFullYear() + 1;
  }, 'Année invalide'),
  mileage: z.string().refine(val => !isNaN(Number(val)), 'Le kilométrage doit être un nombre'),
  fuelType: z.string().min(1, 'Sélectionnez un type de carburant'),
  transmission: z.string().min(1, 'Sélectionnez un type de transmission'),
  color: z.string().min(1, 'La couleur est requise'),
  doors: z.string().refine(val => !isNaN(Number(val)), 'Le nombre de portes doit être un nombre'),
  location: z.string().min(1, 'La localisation est requise'),
});

// Validation schema pour immobilier
const propertySchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  description: z.string().min(20, 'La description doit contenir au moins 20 caractères'),
  price: z.string().refine(val => !isNaN(Number(val)), 'Le prix doit être un nombre'),
  propertyType: z.string().min(1, 'Sélectionnez un type de propriété'),
  bedrooms: z.string().refine(val => !isNaN(Number(val)), 'Le nombre de chambres doit être un nombre'),
  bathrooms: z.string().refine(val => !isNaN(Number(val)), 'Le nombre de salles de bain doit être un nombre'),
  surface: z.string().refine(val => !isNaN(Number(val)), 'La surface doit être un nombre'),
  location: z.string().min(1, 'La localisation est requise'),
});

const VendrePage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [has360View, setHas360View] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [listingType, setListingType] = useState<'vehicle' | 'property'>('vehicle');
  const { toast } = useToast();
  
  // Initialize forms
  const vehicleForm = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      year: '',
      mileage: '',
      fuelType: '',
      transmission: '',
      color: '',
      doors: '',
      location: '',
    },
  });

  const propertyForm = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      surface: '',
      location: '',
    },
  });

  // Handle form submission
  const onSubmitVehicle = (values: z.infer<typeof vehicleSchema>) => {
    console.log('Vehicle values:', values);
    handleSubmitSuccess();
  };

  const onSubmitProperty = (values: z.infer<typeof propertySchema>) => {
    console.log('Property values:', values);
    handleSubmitSuccess();
  };

  const handleSubmitSuccess = () => {
    setSubmitSuccess(true);
    toast({
      title: "Annonce créée avec succès!",
      description: `Votre ${listingType === 'vehicle' ? 'véhicule' : 'propriété'} a été mis en vente.`,
    });

    // Reset form after 2 seconds
    setTimeout(() => {
      vehicleForm.reset();
      propertyForm.reset();
      setImages([]);
      setHas360View(false);
      setSubmitSuccess(false);
    }, 2000);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => 
        URL.createObjectURL(file)
      );
      setImages(prev => [...prev, ...newImages]);
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-autovista-light-gray">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-autovista-blue mb-6">Vendre un bien</h1>
          
          {submitSuccess ? (
            <div className="text-center py-10">
              <div className="mx-auto bg-autovista-teal/10 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <Check className="h-10 w-10 text-autovista-teal" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Annonce publiée !</h2>
              <p className="text-autovista-dark-gray">Votre {listingType === 'vehicle' ? 'véhicule' : 'propriété'} a été mis en vente avec succès.</p>
            </div>
          ) : (
            <>
              {/* Type Selection */}
              <Tabs value={listingType} onValueChange={(value) => setListingType(value as 'vehicle' | 'property')} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="vehicle" className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Véhicule
                  </TabsTrigger>
                  <TabsTrigger value="property" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Immobilier
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="vehicle">
                  <Form {...vehicleForm}>
                    <form onSubmit={vehicleForm.handleSubmit(onSubmitVehicle)} className="space-y-6">
                      {/* Photos Section */}
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Photos du véhicule</h2>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                          {images.map((img, index) => (
                            <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
                              <img src={img} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                              <button 
                                type="button" 
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          
                          {/* Upload Button */}
                          <label className="aspect-square rounded-md overflow-hidden bg-gray-100 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:bg-gray-50">
                            <Upload className="h-8 w-8 text-autovista-dark-gray mb-2" />
                            <span className="text-sm text-autovista-dark-gray">Ajouter photos</span>
                            <input 
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>

                        {/* 360 View Option */}
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <input 
                            type="checkbox" 
                            id="has360View" 
                            checked={has360View}
                            onChange={(e) => setHas360View(e.target.checked)}
                            className="h-4 w-4 text-autovista-teal focus:ring-autovista-teal"
                          />
                          <div className="flex items-center">
                            <Camera className="h-5 w-5 text-autovista-teal mr-2" />
                            <label htmlFor="has360View" className="cursor-pointer">
                              J'ai une visite virtuelle 360°
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Vehicle Information */}
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Informations du véhicule</h2>

                        <FormField
                          control={vehicleForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Titre de l'annonce</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: Mercedes-Benz E 220d AMG Line" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={vehicleForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Décrivez votre véhicule en détail..." className="min-h-[120px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Vehicle specific fields */}
                          <FormField
                            control={vehicleForm.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Prix ($)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="25000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={vehicleForm.control}
                            name="year"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Année</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="2023" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={vehicleForm.control}
                            name="mileage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Kilométrage</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="15000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={vehicleForm.control}
                            name="fuelType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Carburant</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Diesel">Diesel</SelectItem>
                                    <SelectItem value="Essence">Essence</SelectItem>
                                    <SelectItem value="Hybride">Hybride</SelectItem>
                                    <SelectItem value="Électrique">Électrique</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={vehicleForm.control}
                            name="transmission"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Transmission</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Manuelle">Manuelle</SelectItem>
                                    <SelectItem value="Automatique">Automatique</SelectItem>
                                    <SelectItem value="Semi-automatique">Semi-automatique</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={vehicleForm.control}
                            name="color"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Couleur</FormLabel>
                                <FormControl>
                                  <Input placeholder="Noir" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={vehicleForm.control}
                            name="doors"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre de portes</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="5" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={vehicleForm.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Localisation</FormLabel>
                                <FormControl>
                                  <Input placeholder="Kinshasa" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-autovista-teal hover:bg-autovista-blue"
                      >
                        <Car className="h-4 w-4 mr-2" />
                        Publier l'annonce véhicule
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="property">
                  <Form {...propertyForm}>
                    <form onSubmit={propertyForm.handleSubmit(onSubmitProperty)} className="space-y-6">
                      {/* Photos Section */}
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Photos de la propriété</h2>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                          {images.map((img, index) => (
                            <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
                              <img src={img} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                              <button 
                                type="button" 
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          
                          {/* Upload Button */}
                          <label className="aspect-square rounded-md overflow-hidden bg-gray-100 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:bg-gray-50">
                            <Upload className="h-8 w-8 text-autovista-dark-gray mb-2" />
                            <span className="text-sm text-autovista-dark-gray">Ajouter photos</span>
                            <input 
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>

                        {/* 360 View Option */}
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <input 
                            type="checkbox" 
                            id="has360ViewProperty" 
                            checked={has360View}
                            onChange={(e) => setHas360View(e.target.checked)}
                            className="h-4 w-4 text-autovista-teal focus:ring-autovista-teal"
                          />
                          <div className="flex items-center">
                            <Camera className="h-5 w-5 text-autovista-teal mr-2" />
                            <label htmlFor="has360ViewProperty" className="cursor-pointer">
                              J'ai une visite virtuelle 360°
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Property Information */}
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Informations de la propriété</h2>

                        <FormField
                          control={propertyForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Titre de l'annonce</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: Villa moderne avec piscine" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={propertyForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Décrivez votre propriété en détail..." className="min-h-[120px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Property specific fields */}
                          <FormField
                            control={propertyForm.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Prix ($)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="450000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={propertyForm.control}
                            name="propertyType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type de propriété</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Villa">Villa</SelectItem>
                                    <SelectItem value="Maison">Maison</SelectItem>
                                    <SelectItem value="Appartement">Appartement</SelectItem>
                                    <SelectItem value="Terrain">Terrain</SelectItem>
                                    <SelectItem value="Bureau">Bureau</SelectItem>
                                    <SelectItem value="Commerce">Commerce</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={propertyForm.control}
                            name="bedrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Chambres</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="4" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={propertyForm.control}
                            name="bathrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Salles de bain</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="3" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={propertyForm.control}
                            name="surface"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Surface (m²)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="300" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={propertyForm.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Localisation</FormLabel>
                                <FormControl>
                                  <Input placeholder="Kinshasa, Gombe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-autovista-teal hover:bg-autovista-blue"
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Publier l'annonce immobilière
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendrePage;
