import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import Select from 'components/shared/Select/Select'
import FormItem from 'components/shared/FormItem'
import { BoatSVGs } from 'components/shared/BoatSVGs'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import AddBoatService, {
  CharterType,
  CityType,
  HarbourType,
  ManufacturerType,
  ModelType,
  YachtType,
} from 'services/addBoat'
import { useQuery, useQueryClient } from 'react-query'
import CustomCombobox from 'components/shared/CustomCombobox/CustomCombobox'
import FormError from 'components/shared/FormError'
import UpdateBoatService from 'services/updateBoat'
import InputWithHelper from 'components/shared/InputWithHelper'
import ImageUpload from 'components/shared/ImageUpload'
import { useHistory } from 'react-router-dom'
import Textarea from 'components/shared/Textarea'

type Props = {
  saved?: boolean
  yachtId?: string
}

const AddBoatForm = ({ saved, yachtId }: Props) => {
  const [boatType, setBoatType] = useState<YachtType>({ id: '', name: '' })
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [isPro, setIsPro] = useState('false')
  const [captain, setCaptain] = useState('1')
  const [city, setCity] = useState<CityType>({ id: '', name: '' })
  const [harbour, setHarbour] = useState<HarbourType>({ id: '', name: '' })
  const [capacity, setCapacity] = useState('')
  const [length, setLength] = useState('')
  const [manufacturer, setManufacturer] = useState<ManufacturerType>({
    id: '',
    name: '',
  })
  const [model, setModel] = useState<ModelType>({ id: '', name: '' })
  const [file, setFile] = useState<File | null>(null)
  const [fileURL, setFileURL] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('')

  const errorSchema = {
    name: '',
    type: '',
    yacht_icon: '',
    harbour: '',
    capacity: '',
    length: '',
    model: '',
    captain: '',
    chartered_with: '',
    company_name: '',
    website: '',
  }

  const [errors, setErrors] = useState(errorSchema)

  const queryClient = useQueryClient()
  const history = useHistory()

  const { data: yachtTypes } = useQuery('getYachtTypes', async () => {
    const { data } = await AddBoatService.getYachtTypes()
    return data
  })
  const { data: charterTypes } = useQuery('getCharterTypes', async () => {
    const { data } = await AddBoatService.getCharterTypes()
    return data
  })
  const { data: cities } = useQuery('getCities', async () => {
    const { data } = await AddBoatService.getCities()
    return data
  })
  const { data: harbours } = useQuery(['getHarbours', city.id], async () => {
    const { data } = await AddBoatService.getHarbours(city.id)
    return data
  })
  const { data: manufacturers } = useQuery('getManufacturers', async () => {
    const { data } = await AddBoatService.getManufacturers()
    return data
  })

  const { data: models } = useQuery(
    ['getModels', manufacturer.id],
    async () => {
      const { data } = await AddBoatService.getModels(manufacturer.id)
      return data
    },
  )

  const addCity = async (name: string) => {
    toast
      .promise(AddBoatService.addCity(name), {
        success: response => response.message,
        loading: 'Adding city...',
        error: error => error.response.data.name,
      })
      .then(() => queryClient.invalidateQueries('getCities'))
  }
  const addHarbour = async (name: string) => {
    toast
      .promise(AddBoatService.addHarbour({ cityId: city.id, name }), {
        success: response => response.message,
        loading: 'Adding harbour...',
        error: error => error.response.data.name,
      })
      .then(() => queryClient.invalidateQueries('getHarbours'))
  }
  const addManufacturer = async (name: string) => {
    toast
      .promise(AddBoatService.addManufacturer(name), {
        success: response => response.message,
        loading: 'Adding manufacturer...',
        error: error => error.response.data.name,
      })
      .then(() => queryClient.invalidateQueries('getManufacturers'))
  }
  const addModel = async (name: string) => {
    toast
      .promise(
        AddBoatService.addModel({ name, manufacturerId: manufacturer.id }),
        {
          success: response => response.message,
          loading: 'Adding model...',
          error: error => error.response.data.name,
        },
      )
      .then(() => queryClient.invalidateQueries('getModels'))
  }

  const handleSave = () => {
    if (Object.keys(errors).length > 0) {
      setErrors(errorSchema)
    }
    if (isPro === 'false') {
      setCompanyName('')
      setCompanyWebsite('')
    }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('type', boatType.id)
    formData.append('is_professional', isPro)
    formData.append('chartered_with', captain)
    formData.append('harbour', harbour.id)
    formData.append('capacity', capacity)
    formData.append('length', length)
    formData.append('model', model.id)
    formData.append('company_name', companyName)
    formData.append('website', companyWebsite)
    if (file) formData.append('yacht_icon', file)

    if (saved && yachtId) {
      toast
        .promise(UpdateBoatService.updateBoat(yachtId, formData), {
          success: response => response.data.message,
          loading: 'Updating boat...',
          error: "Can't update boat",
        })
        .then(() => queryClient.invalidateQueries('getBoat'))
        .catch(error => {
          setErrors(error.response.data)
        })
    } else {
      toast
        .promise(AddBoatService.addBoat(formData), {
          success: response => response.data.message,
          loading: 'Adding boat...',
          error: "Can't add boat",
        })
        .then(response =>
          history.push(`/yacht/${response.data?.data.id}/photos`),
        )
        .catch(error => {
          setErrors(error.response.data)
        })
    }
  }

  useEffect(() => {
    if (city.id) {
      queryClient.invalidateQueries('getHarbours')
    }
  }, [city])

  useEffect(() => {
    const getBoat = async (yachtId: string) => {
      const response = await UpdateBoatService.getBoat(yachtId)
      const emptyData = { id: '', name: '' }
      setName(response.data.name || '')
      setDescription(response.data.description || '')
      setBoatType(response.data.type || emptyData)
      setIsPro(response.data.is_professional.toString() || 'false')
      setCaptain(response.data.chartered_with.id || '')
      setCity(response.data.harbour.city || emptyData)
      setHarbour({
        id: response.data.harbour.id.toString() || '',
        name: response.data.harbour.name || '',
      })
      setCapacity(response.data.capacity.toString() || '')
      setLength(response.data.length.toString() || '')
      setModel({
        id: response.data.model.id.toString() || '',
        name: response.data.model.name || '',
      })
      setManufacturer(response.data.model.manufacturer || emptyData)

      setCompanyName(response.data.company_name || '')
      setCompanyWebsite(response.data.website || '')
      setFileURL(response.data.yacht_icon || '')
    }
    if (saved && yachtId) {
      getBoat(yachtId)
    }
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row ">
        <div className="flex items-center">
          <div className="flex-col">
            <ImageUpload
              setFile={setFile}
              title="Add Icon"
              imgUrl={
                fileURL ||
                'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
              }
            />
            <FormError text={errors.yacht_icon} />
          </div>
        </div>

        <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          <FormItem label="Name">
            <InputWithHelper
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name of boat"
              helperText={errors.name}
            />
          </FormItem>
          <FormItem label="Description" className="mt-5">
            <Textarea
              placeholder="Write about your yacht Number of berths, equipment, safety
              features. The history of the yacht, your use of this yacht (family
              outings, regattas).
              "
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
          </FormItem>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
        <FormItem label="Are you a professional">
          <Select
            value={isPro}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setIsPro(e.target.value)
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </FormItem>

        <FormItem label="Is your yacht chartered with a Captain ?">
          <Select
            value={captain}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCaptain(e.target.value)
            }
          >
            {charterTypes?.results.map((charterType: CharterType) => (
              <option key={charterType.id} value={charterType.id}>
                {charterType.name}
              </option>
            ))}
          </Select>
          <FormError text={errors.chartered_with} />
        </FormItem>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
        <FormItem className="relative" label="City">
          <CustomCombobox
            data={cities}
            onAddOption={addCity}
            selectedItem={city}
            setSelectedItem={setCity}
            modalTitle="Add City"
          />
        </FormItem>
        <FormItem className="relative" label="Harbour">
          <CustomCombobox
            data={harbours}
            onAddOption={addHarbour}
            selectedItem={harbour}
            setSelectedItem={setHarbour}
            modalTitle="Add harbour"
          />
          <FormError text={errors.harbour} />
        </FormItem>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
        <FormItem label="Capacity (Authorised)">
          <InputWithHelper
            type="number"
            value={capacity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCapacity(e.target.value)
            }
            min="1"
            helperText={errors.capacity}
          />
        </FormItem>
        <FormItem label="Length (m)">
          <InputWithHelper
            type="number"
            value={length}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLength(e.target.value)
            }
            min="1"
            helperText={errors.length}
          />
        </FormItem>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
        <FormItem label="Manufacturer">
          <CustomCombobox
            data={manufacturers}
            onAddOption={addManufacturer}
            selectedItem={manufacturer}
            setSelectedItem={setManufacturer}
            modalTitle={'Add Manufacturer'}
          />
        </FormItem>

        <FormItem label="Model">
          <CustomCombobox
            data={models}
            onAddOption={addModel}
            selectedItem={model}
            setSelectedItem={setModel}
            modalTitle={'Add Model'}
          />
          <FormError text={errors.model} />
        </FormItem>
      </div>
      {isPro === 'true' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <FormItem label="Company's Name">
            <InputWithHelper
              helperText={errors.company_name}
              value={companyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanyName(e.target.value)
              }
            />
          </FormItem>
          <FormItem label="Website">
            <InputWithHelper
              helperText={errors.website}
              value={companyWebsite}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanyWebsite(e.target.value)
              }
            />
          </FormItem>
        </div>
      )}
      <h3 className="text-lg font-semibold">Type</h3>
      <div className="grid grid-cols-5 gap-5 ">
        <BoatSVGs
          yachtTypes={yachtTypes?.results}
          onClick={setBoatType}
          selected={boatType}
        />
      </div>
      <FormError text={errors.type} />

      <div className="flex">
        <ButtonPrimary className="w-1/3" onClick={handleSave}>
          Save
        </ButtonPrimary>
      </div>
    </div>
  )
}

export default AddBoatForm
