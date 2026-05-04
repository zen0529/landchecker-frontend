import { http, HttpResponse } from 'msw'

// Using wildcards to make handlers more robust across different environments
export const handlers = [
  // Mock Auth Me
  http.get('*/api/v1/auth/me', () => {
    return HttpResponse.json({
      user: { id: 1, first_name: 'Test', last_name: 'User', email: 'test@example.com' }
    })
  }),

  // Mock Watchlist GET
  http.get('*/api/v1/watchlist_items', () => {
    return HttpResponse.json([
      { id: 1, property_id: 101, property: { id: 101, title: 'Mocked Property 1', price: 1000000, images: ['img1.jpg'] } },
      { id: 2, property_id: 102, property: { id: 102, title: 'Mocked Property 2', price: 850000, images: ['img2.jpg'] } },
    ])
  }),

  // Mock Properties GET
  http.get('*/api/v1/properties', () => {
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

  // Mock Watchlist POST
  http.post('*/api/v1/watchlist_items', async ({ request }) => {
    const newItem = await request.json()
    return HttpResponse.json({
      watchlist_item: {
        id: Math.floor(Math.random() * 1000),
        property_id: newItem.watchlist_item.property_id,
        status: 'success'
      }
    }, { status: 201 })
  }),

  // Mock Watchlist DELETE
  http.delete('*/api/v1/watchlist_items/:id', ({ params }) => {
    return HttpResponse.json({ message: `Item ${params.id} removed` })
  }),
]
