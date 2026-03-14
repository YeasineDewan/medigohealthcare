<?php
/**
 * Video Carousel List API
 * GET /api/v1/video-carousel
 */

require_once '../config.php';

// Get query parameters
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
$status = isset($_GET['status']) ? $_GET['status'] : 'active';
$category = isset($_GET['category']) ? $_GET['category'] : null;
$featured = isset($_GET['featured']) ? $_GET['featured'] : null;
$search = isset($_GET['search']) ? $_GET['search'] : null;

// Validate pagination
$page = max(1, $page);
$limit = min(100, max(1, $limit));
$offset = ($page - 1) * $limit;

// Build WHERE clause
$where = ['status = ?'];
$params = [$status];

if ($category) {
    $where[] = 'category = ?';
    $params[] = $category;
}

if ($featured !== null) {
    $where[] = 'featured = ?';
    $params[] = $featured === 'true' ? 1 : 0;
}

if ($search) {
    $where[] = '(title LIKE ? OR description LIKE ?)';
    $params[] = "%$search%";
    $params[] = "%$search%";
}

$whereClause = 'WHERE ' . implode(' AND ', $where);

// Get total count
$totalResult = $db->fetchOne(
    "SELECT COUNT(*) as total FROM video_carousel $whereClause",
    $params
);
$total = $totalResult['total'];

// Get videos with pagination
$videos = $db->fetch(
    "SELECT * FROM video_carousel 
     $whereClause 
     ORDER BY display_order ASC, created_at DESC 
     LIMIT ? OFFSET ?",
    array_merge($params, [$limit, $offset])
);

// Format videos for frontend
$formattedVideos = array_map(function($video) {
    return [
        'id' => (int)$video['id'],
        'title' => $video['title'],
        'description' => $video['description'],
        'url' => $video['video_url'],
        'thumbnail' => $video['thumbnail_url'],
        'category' => $video['category'],
        'status' => $video['status'],
        'order' => (int)$video['display_order'],
        'autoplay' => (bool)$video['autoplay'],
        'mute' => (bool)$video['mute'],
        'loop' => (bool)$video['loop'],
        'showControls' => (bool)$video['show_controls'],
        'featured' => (bool)$video['featured'],
        'displayPages' => json_decode($video['display_pages'] ?? '[]', true),
        'tags' => json_decode($video['tags'] ?? '[]', true),
        'views' => (int)$video['views'],
        'likes' => (int)$video['likes'],
        'shares' => (int)$video['shares'],
        'duration' => $video['duration'],
        'createdAt' => $video['created_at'],
        'updatedAt' => $video['updated_at']
    ];
}, $videos);

// Return response with pagination
apiResponse([
    'videos' => $formattedVideos,
    'pagination' => [
        'page' => $page,
        'limit' => $limit,
        'total' => (int)$total,
        'totalPages' => ceil($total / $limit),
        'hasNext' => $page * $limit < $total,
        'hasPrev' => $page > 1
    ]
]);
?>
