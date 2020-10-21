const { italic } = require('colors')
const mongoose = require('mongoose')
const FoodModel = require('./food')

describe('Food Model Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.err(err);
        process.exit(1)
      }
    })
  })

  afterAll(() => mongoose.disconnect())

  it('creates and saves a food successfully', async () => {
    const validFood = new FoodModel({
      name: 'Hamburger',
      temperature: 375,
      duration: 18,
      frozen: true
    })
    const savedFood = await validFood.save()
    expect(savedFood._id).toBeDefined()
    expect(savedFood.name).toBe(validFood.name)
    expect(savedFood.temperature).toBe(validFood.temperature)
    expect(savedFood.duration).toBe(validFood.duration)
    expect(savedFood.frozen).toBe(validFood.frozen)
  })

  it('validates name exists on food', async () => {
    const invalidEntry = new FoodModel({temperature: 100, duration: 100, frozen: true})
    let err 
    try {
      await invalidEntry.save()
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.name).toBeDefined()
  })

  it('validates temperature exists on food', async () => {
    const invalidEntry = new FoodModel({name: 'Test', duration: 100, frozen: true})
    let err 
    try {
      await invalidEntry.save()
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.temperature).toBeDefined()
  })

  it('validates temperature is above zero on food', async () => {
    const invalidEntry = new FoodModel({name: 'Test', temperature: -1, duration: 100, frozen: true})
    let err 
    try {
      await invalidEntry.save()
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.temperature).toBeDefined()
  })

  it('validates duration exists on food', async () => {
    const invalidEntry = new FoodModel({name: 'Test', temperature: 100, frozen: true})
    let err 
    try {
      await invalidEntry.save()
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.duration).toBeDefined()
  })

  it('validates duration is above zero on food', async () => {
    const invalidEntry = new FoodModel({name: 'Test', duration: -1, temperature: 100, frozen: true})
    let err 
    try {
      await invalidEntry.save()
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.duration).toBeDefined()
  })   
})