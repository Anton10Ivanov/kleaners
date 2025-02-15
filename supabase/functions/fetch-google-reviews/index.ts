
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const PLACE_ID = 'YOUR_PLACE_ID' // Replace with your actual Google Maps Place ID
    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!apiKey || !supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing environment variables')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Fetch reviews from Google Maps API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${apiKey}`
    )
    const data = await response.json()

    if (!data.result?.reviews) {
      throw new Error('No reviews found')
    }

    // Process and store each review
    for (const review of data.result.reviews) {
      const reviewData = {
        review_id: review.time + '_' + review.author_name, // Create a unique ID
        author_name: review.author_name,
        author_photo_url: review.profile_photo_url,
        rating: review.rating,
        text_content: review.text,
        time_created: new Date(review.time * 1000).toISOString(),
        place_id: PLACE_ID
      }

      // Upsert the review
      const { error } = await supabase
        .from('google_reviews')
        .upsert(reviewData, {
          onConflict: 'review_id'
        })

      if (error) {
        console.error('Error upserting review:', error)
      }
    }

    const { data: reviews, error: fetchError } = await supabase
      .from('google_reviews')
      .select('*')
      .order('time_created', { ascending: false })
      .limit(3)

    if (fetchError) {
      throw fetchError
    }

    return new Response(JSON.stringify(reviews), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
