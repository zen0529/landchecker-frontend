import { http, HttpResponse } from 'msw'

export const handlers = [
  // Broad matchers for maximum reliability in tests
  http.get('*/auth/me', () => {
    return HttpResponse.json({
      user: { id: 1, first_name: 'Test', last_name: 'User', email: 'test@example.com' }
    })
  }),

  http.post('*/auth/login', async ({ request }) => {
    const { user } = await request.json()
    if (user.email === 'test@example.com' && user.password === 'password') {
      return HttpResponse.json({
        token: 'fake-jwt-token',
        user: { id: 1, first_name: 'Test', last_name: 'User', email: 'test@example.com' }
      })
    }
    return HttpResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }),

  http.post('*/auth/register', async ({ request }) => {
    const { user } = await request.json()
    return HttpResponse.json({
      token: 'fake-jwt-token',
      user: { id: 2, first_name: user.first_name, last_name: user.last_name, email: user.email }
    })
  }),

  http.delete('*/auth/logout', () => {
    return HttpResponse.json({ message: 'Logged out successfully' })
  }),

  http.get('*/watchlist_items', () => {
    return HttpResponse.json([
      { id: 1, property_id: 101, property: { id: 101, title: 'Mocked Property 1', price: 1000000, images: ['img1.jpg'] } },
      { id: 2, property_id: 102, property: { id: 102, title: 'Mocked Property 2', price: 850000, images: ['img2.jpg'] } },
    ])
  }),

  http.get('*/properties', () => {
    return HttpResponse.json({
      data: [
        { id: 101, title: 'Beachfront Villa', suburb: 'Bondi', price: 2500000, images: ['img1.jpg'], status: 'active', property_type: 'house' },
        { id: 102, title: 'City Penthouse', suburb: 'Sydney', price: 1800000, images: ['img2.jpg'], status: 'active', property_type: 'apartment' },
        { id: 103, title: 'Suburban Home', suburb: 'Richmond', price: 950000, images: ['img3.jpg'], status: 'active', property_type: 'house' },
      ],
      total: 3,
      page: 1,
      per_page: 20
    })
  }),

  http.post('*/watchlist_items', async ({ request }) => {
    const newItem = await request.json()
    return HttpResponse.json({
      watchlist_item: {
        id: Math.floor(Math.random() * 1000),
        property_id: newItem.watchlist_item.property_id,
        status: 'success'
      }
    }, { status: 201 })
  }),

  http.delete('*/watchlist_items/:id', ({ params }) => {
    return HttpResponse.json({ message: `Item ${params.id} removed` })
  }),
]
