<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->getId(),
            "amount" => $this->getAmount(),
            "description" => $this->getDescription(),
            "timestamp" => date('Y-m-d', $this->getTimestamp()),
            "tags" => TagResource::collection(collect($this->getTags())),
        ];
    }
}
