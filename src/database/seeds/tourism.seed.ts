import { DataSource } from 'typeorm';
import { TourismSpot } from '../../tourism/entities/tourism-spot.entity';
import { TourismImportantPoint } from '../../tourism/entities/tourism-important-point.entity';
import { TourismHighlight } from '../../tourism/entities/tourism-highlight.entity';
import { TourismGalleryMedia } from '../../tourism/entities/tourism-gallery-media.entity';

export async function seedTourism(dataSource: DataSource): Promise<void> {
  const spotRepo = dataSource.getRepository(TourismSpot);
  const pointRepo = dataSource.getRepository(TourismImportantPoint);
  const highlightRepo = dataSource.getRepository(TourismHighlight);
  const galleryRepo = dataSource.getRepository(TourismGalleryMedia);

  const count = await spotRepo.count();
  if (count === 0) {
    // 1. Tiger Point (Lions Point)
    const spot1 = spotRepo.create({
      name: 'Tiger Point (Lions Point)',
      label: 'Scenic Viewpoint & Sunrise',
      distance: '12 km from Lonavala Station',
      mediaUrl:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      description:
        'Perched at a cliff height of over 650 meters, Tiger Point offers breathtaking panoramic views of deep Sahyadri valleys, cascading monsoon waterfalls, and lush misty clouds.',
      sortOrder: 1,
      active: true,
    });
    const saved1 = await spotRepo.save(spot1);

    await pointRepo.save([
      pointRepo.create({
        icon: 'Clock',
        text: 'Best time to visit: 5:30 AM – 7:00 PM during Monsoons (June to October)',
        sortOrder: 1,
        spot: saved1,
      }),
      pointRepo.create({
        icon: 'Car',
        text: 'Ample municipal parking available near viewpoints; drive cautiously along mountain ghats',
        sortOrder: 2,
        spot: saved1,
      }),
      pointRepo.create({
        icon: 'Utensils',
        text: 'Famous for hot steamed sweet corn (Bhutta), freshly made onion bhajiyas, and ginger tea',
        sortOrder: 3,
        spot: saved1,
      }),
    ]);

    await highlightRepo.save([
      highlightRepo.create({
        key: 'Timing',
        value: '6:00 AM – 7:00 PM Daily',
        sortOrder: 1,
        spot: saved1,
      }),
      highlightRepo.create({
        key: 'Entry Fee',
        value: 'Free (Municipal vehicle toll ₹50 applies)',
        sortOrder: 2,
        spot: saved1,
      }),
      highlightRepo.create({
        key: 'Ideal Duration',
        value: '1.5 – 2 Hours',
        sortOrder: 3,
        spot: saved1,
      }),
    ]);

    await galleryRepo.save([
      galleryRepo.create({
        mediaUrl:
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        sortOrder: 1,
        spot: saved1,
      }),
      galleryRepo.create({
        mediaUrl:
          'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        sortOrder: 2,
        spot: saved1,
      }),
    ]);

    // 2. Bhushi Dam
    const spot2 = spotRepo.create({
      name: 'Bhushi Dam & Waterfall Overflow',
      label: 'Monsoon Water Cascade',
      distance: '6 km from Lonavala Town',
      mediaUrl:
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
      description:
        'Built on the Indrayani River, Bhushi Dam is one of the most celebrated monsoon attractions in Maharashtra. Water overflows over engineered stone steps, creating natural bubbling cascades.',
      sortOrder: 2,
      active: true,
    });
    const saved2 = await spotRepo.save(spot2);

    await pointRepo.save([
      pointRepo.create({
        icon: 'AlertTriangle',
        text: 'High water volume during peak heavy rain; adhere strictly to municipal lifeguard alerts',
        sortOrder: 1,
        spot: saved2,
      }),
      pointRepo.create({
        icon: 'Footprints',
        text: 'Wear rubber grip footwear to navigate wet masonry steps safely',
        sortOrder: 2,
        spot: saved2,
      }),
    ]);

    await highlightRepo.save([
      highlightRepo.create({
        key: 'Timing',
        value: '9:00 AM – 5:00 PM (Monsoon Restricted)',
        sortOrder: 1,
        spot: saved2,
      }),
      highlightRepo.create({
        key: 'Safety',
        value: 'Municipal Disaster Rescue Team Deployed',
        sortOrder: 2,
        spot: saved2,
      }),
    ]);

    await galleryRepo.save([
      galleryRepo.create({
        mediaUrl:
          'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        sortOrder: 1,
        spot: saved2,
      }),
    ]);

    // 3. Karla Caves (Ancient Buddhist Rock-Cut Architecture)
    const spot3 = spotRepo.create({
      name: 'Karla Caves (कार्ले लेणी)',
      label: 'Archaeological Heritage & Chaitya Hall',
      distance: '11 km from Lonavala on Old Highway',
      mediaUrl:
        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      description:
        'Carved in 2nd century BC, Karla Caves represent one of the finest and largest rock-cut Buddhist shrine complexes (Chaitya) in India, complete with intricate stone stupas, sculpted pillars, and original teak wood ribs.',
      sortOrder: 3,
      active: true,
    });
    const saved3 = await spotRepo.save(spot3);

    await pointRepo.save([
      pointRepo.create({
        icon: 'Landmark',
        text: 'Protected monument maintained by Archaeological Survey of India (ASI)',
        sortOrder: 1,
        spot: saved3,
      }),
      pointRepo.create({
        icon: 'Footprints',
        text: 'Requires a climb of around 350 stone steps; palanquin service available for senior citizens',
        sortOrder: 2,
        spot: saved3,
      }),
    ]);

    await highlightRepo.save([
      highlightRepo.create({
        key: 'Timing',
        value: '9:00 AM – 6:00 PM Daily',
        sortOrder: 1,
        spot: saved3,
      }),
      highlightRepo.create({
        key: 'ASI Entry Ticket',
        value: '₹25 for Indians, ₹300 for Foreign Tourists',
        sortOrder: 2,
        spot: saved3,
      }),
    ]);

    await galleryRepo.save([
      galleryRepo.create({
        mediaUrl:
          'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        mediaType: 'image',
        sortOrder: 1,
        spot: saved3,
      }),
    ]);

    console.log('✅ Seeded 3 Tourism Spots with points, highlights, and gallery media');
  }
}
