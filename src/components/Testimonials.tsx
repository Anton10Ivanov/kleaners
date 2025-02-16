
import { useQuery } from '@tanstack/react-query'
import { supabase } from "@/integrations/supabase/client"
import { Star } from 'lucide-react'

interface Review {
  id: string
  author_name: string
  author_photo_url: string | null
  rating: number
  text_content: string | null
  time_created: string
}

const Testimonials = () => {
  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const response = await supabase.functions.invoke('fetch-google-reviews', {
        method: 'GET',
      })
      
      if (response.error) {
        console.error('Error fetching reviews:', response.error)
        throw response.error
      }
      
      return response.data as Review[]
    }
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
        }`}
      />
    ))
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading reviews...</div>
  }

  if (error) {
    console.error('Error loading reviews:', error)
    return null
  }

  return (
    <section className="bg-white dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Read reviews from our satisfied customers
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {(reviews || []).map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-4">
                {review.author_photo_url && (
                  <img
                    src={review.author_photo_url}
                    alt={review.author_name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {review.author_name}
                  </p>
                  <div className="flex mt-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "{review.text_content}"
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(review.time_created).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
