<?php

namespace App\Models\Neo;

use GraphAware\Neo4j\OGM\Annotations as OGM;
use GraphAware\Neo4j\OGM\Common\Collection;

/**
 * App\Models\Neo\Movie
 *
 * @OGM\Node (label="Movie")
 */
class Movie
{
    /**
     * @OGM\GraphId()
     * @var int
     */
    protected $id;

    /**
     * @OGM\Property(type="int")
     * @var int
     */
    protected $movieId;

    /**
     * @OGM\Property(type="string")
     * @var string
     */
    protected $name;

    /**
     * @OGM\Property(type="string")
     * @var string
     */
    protected $posterURL;

    /**
     * @OGM\Relationship(type="WATCH_MOVIE", direction="INCOMING", collection=true, mappedBy="movies", targetEntity="User")
     * @var User[]|Collection
     */
    protected $users;

    /**
     * Movie constructor.
     */
    public function __construct()
    {
        $this->users = new Collection();
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return int
     */
    public function getMovieId(): int
    {
        return $this->movieId;
    }

    /**
     * @param int $movieId
     */
    public function setMovieId($movieId)
    {
        $this->movieId = $movieId;
    }

    /**
     * @return string
     */
    public function getMovieName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setMovieName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getPosterURL(): string
    {
        return $this->posterURL;
    }

    /**
     * @param string $posterURL
     */
    public function setPosterURL($posterURL)
    {
        $this->name = $posterURL;
    }

    /**
     * @return User[]|Collection
     */
    public function getUsers()
    {
        return $this->users;
    }

}
