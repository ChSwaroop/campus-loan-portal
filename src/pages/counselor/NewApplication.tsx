
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoanStore } from '@/store/loanStore';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Info } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  studentName: z.string().min(2, { message: "Student name is required" }),
  fatherName: z.string().min(2, { message: "Father's name is required" }),
  motherName: z.string().min(2, { message: "Mother's name is required" }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  aadharNumber: z.string()
    .min(12, { message: "Aadhar number must be 12 digits" })
    .max(14, { message: "Aadhar number must be 12 digits" })
    .regex(/^\d{4}[- ]?\d{4}[- ]?\d{4}$/, { message: "Invalid Aadhar format" }),
  panCard: z.string()
    .min(10, { message: "PAN card must be 10 characters" })
    .max(10, { message: "PAN card must be 10 characters" })
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "Invalid PAN format" }),
  cibilScore: z.number()
    .min(300, { message: "CIBIL score must be between 300 and 900" })
    .max(900, { message: "CIBIL score must be between 300 and 900" }),
});

type FormValues = z.infer<typeof formSchema>;

const NewApplication: React.FC = () => {
  const { createApplication, isLoading } = useLoanStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sliderValue, setSliderValue] = useState<number[]>([750]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: '',
      fatherName: '',
      motherName: '',
      aadharNumber: '',
      panCard: '',
      cibilScore: 750,
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "User information is missing",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Make sure all required properties are passed to createApplication
      // Convert the date object to a string format expected by the API
      await createApplication({
        studentName: data.studentName,
        fatherName: data.fatherName,
        motherName: data.motherName,
        dateOfBirth: format(data.dateOfBirth, 'yyyy-MM-dd'),
        aadharNumber: data.aadharNumber,
        panCard: data.panCard,
        cibilScore: data.cibilScore,
        counselorId: user.id,
      });
      
      toast({
        title: "Application submitted",
        description: "The loan application has been submitted successfully."
      });
      
      navigate('/counselor');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive"
      });
    }
  };
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    form.setValue('cibilScore', value[0]);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">New Loan Application</h1>
        <Button variant="outline" onClick={() => navigate('/counselor')}>
          Cancel
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <CardDescription>
            Enter the student's personal and financial details for the loan application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name of the student" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1940-01-01")
                            }
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Student's date of birth
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Father's Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name of father" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="motherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mother's Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name of mother" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aadharNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhar Number</FormLabel>
                      <FormControl>
                        <Input placeholder="xxxx-xxxx-xxxx" {...field} />
                      </FormControl>
                      <FormDescription>12-digit government ID</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="panCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PAN Card</FormLabel>
                      <FormControl>
                        <Input placeholder="ABCDE1234F" {...field} />
                      </FormControl>
                      <FormDescription>10-character tax ID</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="cibilScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      CIBIL Score
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="ml-1 h-4 w-4">
                            <Info className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <p className="text-sm">
                            CIBIL Score ranges from 300 to 900. Higher scores indicate better creditworthiness:
                            <br />
                            - 300-549: Poor
                            <br />
                            - 550-649: Fair
                            <br />
                            - 650-749: Good
                            <br />
                            - 750-900: Excellent
                          </p>
                        </PopoverContent>
                      </Popover>
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[750]}
                          min={300}
                          max={900}
                          step={1}
                          value={sliderValue}
                          onValueChange={handleSliderChange}
                          className="py-4"
                        />
                        <div className="flex justify-between items-center">
                          <span className={cn(
                            "text-sm font-medium",
                            sliderValue[0] < 550 ? "text-red-500" : 
                            sliderValue[0] < 650 ? "text-yellow-500" : 
                            sliderValue[0] < 750 ? "text-blue-500" : "text-green-500"
                          )}>
                            {sliderValue[0]}
                          </span>
                          <div className="text-sm">
                            <span className={cn(
                              "px-2 py-1 rounded text-xs",
                              sliderValue[0] < 550 ? "bg-red-100 text-red-700" : 
                              sliderValue[0] < 650 ? "bg-yellow-100 text-yellow-700" : 
                              sliderValue[0] < 750 ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                            )}>
                              {sliderValue[0] < 550 ? "Poor" : 
                               sliderValue[0] < 650 ? "Fair" : 
                               sliderValue[0] < 750 ? "Good" : "Excellent"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Credit score that affects loan approval probability
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <CardFooter className="px-0 pt-6 flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/counselor')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewApplication;
