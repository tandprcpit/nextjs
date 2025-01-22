'use client'

import { useState } from 'react'
import { useForm, useFieldArray, Controller, Control } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Loader2, Plus, Trash2 } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/apiResponse"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { companySchema, CompanyFormData } from '@/schemas/companySchema'
import { liveKTOptions } from '@/data/options'
import Link from 'next/link'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-60 w-full animate-pulse bg-muted" />
})
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'

const SKILLS = [
  'html',
  'css',
  'javascript',
  'typescript',
  'reactjs',
  'nodejs',
  'expressjs',
  'nextjs',
  'mongodb',
  'sql',
  'git',
  'docker',
  'kubernetes',
  'aws',
  'firebase',
  'python',
  'django',
  'flask',
  'java',
  'cpp',
  'graphql'
];

const DEPARTMENTS = ["Computer",
  "Data Science",
  "AIML",
  "E&TC",
  "Mechanical",
  "Civil",
  "Electrical",
  "AIDS",
  "IT"];

const AnyGap = [
  "Yes",
  "No",
];


export default function AddCompanyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      description: '',
      salary: '',
      location: '',
      bond: '',
      criteria: {
        overallCGPA: 0,
        gender: [],
        passoutYear: new Date().getFullYear(),
        anyLiveKTs: 0,
        anyGapDuringEducation: [],
        department: [],
        tenthMarks: 0,
        twelfthPercentage: 0,
        diplomaPercentage: 0,
        skills: [],
      },
      rounds: [
        { roundNumber: 3, roundName: '' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rounds"
  });

  const onSubmit = async (data: CompanyFormData) => {
    setIsSubmitting(true)

    try {
      console.log(data);
      const response = await axios.post<ApiResponse>('/api/tpc/add-company/', data)
      toast({
        title: 'Company Added',
        description: response.data.message,
      })
      router.push('/tpc/companies')
    } catch (error) {
      console.error('error in signup of User', error)
      const AxiosError = error as AxiosError<ApiResponse>;
      let errorMessage = AxiosError.response?.data.message

      toast({
        title: "Failed to add company",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
 
      <div className=" p-8 rounded-lg max-w-4xl mx-auto">
        <Link
          href="/tpc/companies"
          className="inline-flex items-center text-[#244855] hover:text-[#E64833] transition-colors"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Companies
        </Link>
        <h2 className="text-3xl font-bold mb-6 text-center text-primary1">
          Add New Company
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-primary1">
                Company Name
              </label>
              <Input
                id="name"
                placeholder="Company Name"
                {...form.register('name')}
                className="w-full"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="salary" className="text-sm font-medium text-primary1">
                Salary (LPA)
              </label>
              <Input
                id="salary"
                type="text"
                placeholder="Salary"
                {...form.register('salary')}
                className="w-full"
              />
              {form.formState.errors.salary && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.salary.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium text-primary1">
                Location
              </label>
              <Input
                id="location"
                placeholder="Location"
                {...form.register('location')}
                className="w-full"
              />
              {form.formState.errors.location && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="bond" className="text-sm font-medium text-primary1">
                Bond
              </label>
              <Input
                id="bond"
                placeholder="Bond details"
                {...form.register('bond')}
                className="w-full"
              />
            </div>
            <div className="space-y-2 md:col-span-2 mb-10">
              <label htmlFor="description" className="text-sm font-medium text-primary1">
                Description
              </label>
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                    className="h-60"
                  />
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary1 border-b border-accent1-1 pb-2 mb-4">Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="cgpa" className="text-sm font-medium text-primary1">
                  CGPA
                </label>
                <Input
                  id="cgpa"
                  type="number"
                  step="0.01"
                  placeholder="CGPA"
                  {...form.register('criteria.overallCGPA', { valueAsNumber: true })}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary1">Gender</label>
                <div className="flex flex-wrap gap-2">
                  <Controller
                    name="criteria.gender"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        {['Male', 'Female', 'Other'].map((gender) => (
                          <div key={gender} className="flex items-center space-x-2">
                            <Checkbox
                              id={`gender-${gender}`}
                              checked={field.value.includes(gender)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, gender])
                                  : field.onChange(field.value.filter((value) => value !== gender))
                              }}
                            />
                            <label htmlFor={`gender-${gender}`}>{gender}</label>
                          </div>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="passoutYear" className="text-sm font-medium text-primary1">
                  Passout Year
                </label>
                <Input
                  id="passoutYear"
                  type="number"
                  placeholder="Passout Year"
                  {...form.register('criteria.passoutYear', { valueAsNumber: true })}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="liveKT" className="text-sm font-medium text-primary1">
                  Live KT
                </label>
                <Select
                  onValueChange={(value) => {
                    const numberValue = parseInt(value, 10); // Convert string to number
                    form.setValue('criteria.anyLiveKTs', numberValue);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {liveKTOptions.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>


              <div className="space-y-2">
                <label className="text-sm font-medium text-primary1">Education Gap</label>
                <div className="flex flex-wrap gap-2">
                  <Controller
                    name="criteria.anyGapDuringEducation"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        {AnyGap.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`educationGap-${option}`}
                              checked={field.value.includes(option)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, option])
                                  : field.onChange(field.value.filter((value) => value !== option))
                              }}
                            />
                            <label htmlFor={`educationGap-${option}`}>{option}</label>
                          </div>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-primary1">Department</label>
                <div className="flex flex-wrap gap-2">
                  <Controller
                    name="criteria.department"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        {DEPARTMENTS.map((dept) => (
                          <div key={dept} className="flex items-center space-x-2">
                            <Checkbox
                              id={`dept-${dept}`}
                              checked={field.value.includes(dept)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, dept])
                                  : field.onChange(field.value.filter((value) => value !== dept))
                              }}
                            />
                            <label htmlFor={`dept-${dept}`}>{dept}</label>
                          </div>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="tenthPercentage" className="text-sm font-medium text-primary1">
                  10th Percentage
                </label>
                <Input
                  id="tenthPercentage"
                  type="number"
                  step="0.01"
                  placeholder="10th Percentage"
                  {...form.register('criteria.tenthMarks', { valueAsNumber: true })}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="twelfthPercentage" className="text-sm font-medium text-primary1">
                  12th Percentage
                </label>
                <Input
                  id="twelfthPercentage"
                  type="number"
                  step="0.01"
                  placeholder="12th Percentage"
                  {...form.register('criteria.twelfthPercentage', { valueAsNumber: true })}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="diplomaPercentage" className="text-sm font-medium text-primary1">
                  Diploma Percentage
                </label>
                <Input
                  id="diplomaPercentage"
                  type="number"
                  step="0.01"
                  placeholder="Diploma Percentage"
                  {...form.register('criteria.diplomaPercentage', { valueAsNumber: true })}
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2 col-span-full">
              <label className="text-sm font-medium text-primary1">Skills</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <Controller
                  name="criteria.skills"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      {SKILLS.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={field.value.includes(skill)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, skill])
                                : field.onChange(field.value.filter((value) => value !== skill))
                            }}
                          />
                          <label htmlFor={`skill-${skill}`} className="text-sm">{skill}</label>
                        </div>
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary1 border-b border-accent1-1 pb-2 mb-4">Rounds</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end space-x-4">
                <div className="flex-grow space-y-2">
                  <label htmlFor={`roundNumber-${index}`} className="text-sm font-medium text-primary1">
                    Round Number
                  </label>
                  <Input
                    id={`roundNumber-${index}`}
                    type="number"
                    {...form.register(`rounds.${index}.roundNumber` as const, { valueAsNumber: true })}
                    className="w-full"
                  />
                </div>
                <div className="flex-grow space-y-2">
                  <label htmlFor={`roundName-${index}`} className="text-sm font-medium text-primary1">
                    Round Name
                  </label>
                  <Input
                    id={`roundName-${index}`}
                    {...form.register(`rounds.${index}.roundName` as const)}
                    className="w-full"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={index === 0}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ roundNumber: fields.length + 3, roundName: '' })}
              className="bg-accent1-2 hover:bg-accent1-2/90 text-primary1"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Round
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#E64833] text-white hover:bg-[#244855] transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              'Add Company'
            )}
          </Button>
        </form>
      </div>
    

  )
}

