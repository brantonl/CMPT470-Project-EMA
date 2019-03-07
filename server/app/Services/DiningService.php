<?php

namespace App\Services;
use App\Models\Neo\Restaurant;
use GuzzleHttp\Client as GuzzleHttpClient;
use GuzzleHttp\Exception\RequestException;
use GraphAware\Neo4j\OGM\EntityManager;
use PhpParser\Error;


class DiningService
{
    private $entityManager;

    /**
     * DiningService constructor.
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param string $location
     * @param string $price
     * @param string $categories
     * @param string $sortby
     * @param string $attributes
     * @param string $open_now
     * @return mixed|null|\Psr\Http\Message\ResponseInterface
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function search(string $location, string $price,string $categories,string $sortby,string $attributes,string $open_now)
    {

        $url = 'https://api.yelp.com/v3/businesses/search?term=restaurants&limit=50' ;
        if($location!==""){
            $url .= "&location=" . $location;
        }
        if($price!=="") {
            $url .= "&price=" . $price;
        }
        if($categories !== "") {
            $url .= "&categories=" . $categories;
        }
        if($sortby !== "") {
            $url .= "&sort_by=" . $sortby;
        }
        if($attributes !== "") {
            $url .= "&attributes=" . $attributes;
        }
        if($open_now !== "") {
            $url .= "&open_now=" . $open_now;
        }
        $requestContent = [
            'headers' => [
                'Authorization'=> "Bearer EXCKgny_5NI0-DuoD-vpEGcsowVY15hUCH60XlgrzSQaePnXN-ghbw0Cv8spDYmmdqcrFEDpKXKVU6oZSb6mxPWtDZqZbBrTD-hBhhTbKz0JFM-jM2vGwXsLi43WW3Yx"
            ]
        ];

        try {
            $client = new GuzzleHttpClient();

            $apiRequest = $client->request('GET', $url, $requestContent);

            $response = json_decode($apiRequest->getBody()->getContents(), true);

            return $response["businesses"];

        } catch (RequestException $re) {
            // For handling exception.
            $response = $re->getResponse();
            return $response;
        }
    }

    /**
     * @param int $userId
     * @param string $rest_id
     * @return mixed
     */
    public function getDeleteUserRestaurant(int $userId, string $rest_id)
    {
        $query = "
            MATCH (u:User {sqlId: {uid}})
            MATCH (r:Restaurant {rest_id: {id}})
            MATCH (u:User)-[:favs]->(r:Restaurant)
            RETURN r
        ";

        return $this->entityManager->createQuery($query)
            ->setParameter('uid', $userId)
            ->setParameter('id', $rest_id)
            ->addEntityMapping('r', Restaurant::class)
            ->getOneResult();
    }

    /**
     * @param int $userId
     * @param string $rest_id
     * @throws \Exception
     */
    public function detachDeleteRestaurant(int $userId, string $rest_id)
    {
        $query = "
            MATCH (u:User {sqlId: {uid}})
            MATCH (r:Restaurant {rest_id: {id}})
            MATCH (u)-[f:favs]->(r)
            DETACH DELETE r
        ";

        $this->entityManager->createQuery($query)
            ->setParameter('uid', $userId)
            ->setParameter('id', $rest_id)
            ->execute();
    }

    /**
     * @param int $userId
     * @return array|mixed
     */
    public function getUserRestaurants(int $userId)
    {
        $query = "
            MATCH (u:User {sqlId: {id}})-[:favs]->(r:Restaurant)
            RETURN DISTINCT r
        ";
        return $this->entityManager->createQuery($query)
            ->setParameter('id', $userId)
            ->addEntityMapping('r', Restaurant::class)
            ->getResult();
    }

    /**
     * @param int $userId
     * @param string $name
     * @param string $rest_id
     * @param string $image_url
     * @param string $phone
     * @param string $city
     * @param string $address
     * @return mixed
     */
    public function createRestaurant(int $userId, string $name, string $rest_id, string $image_url, string $phone, string $city, string $address)
    {
        $query = "
            MERGE (u:User {sqlId: {id}})
            MERGE (r:Restaurant {rest_id: {rest_id}, image_url: {image_url}, phone:{phone}, city:{city}, address:{address}})
            MERGE (u)-[:favs]->(r)
            SET r.name = {name}
            RETURN r
        ";

        return $this->entityManager->createQuery($query)
            ->setParameter('id', $userId)
            ->setParameter('name', $name)
            ->setParameter('rest_id', $rest_id)
            ->setParameter('image_url', $image_url)
            ->setParameter('phone', $phone)
            ->setParameter('city', $city)
            ->setParameter('address', $address)
            ->addEntityMapping('r', Restaurant::class)
            ->getOneResult();
    }

}
