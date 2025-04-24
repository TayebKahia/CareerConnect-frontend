"use client"

import { useEffect, useState } from "react"
import {
    ArrowLeft,
    Briefcase,
    Calendar,
    CheckCircle,
    Download,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    Star,
    User,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useToast } from "../../../../hooks/use-toast"
import { Badge } from "../../../../components/badge"
import { Button } from "../../../../components/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../../../components/card"
import { useCandidates, DetailedCandidate } from "../../../../context/candidates-context"

export default function CVDetailsPage() {
    const { toast } = useToast()
    const { getDetailedCandidate, toggleCandidateSelection } = useCandidates()

    // Use useParams hook instead of the params prop
    const params = useParams()
    const candidateId =
        typeof params.id === "string"
            ? Number.parseInt(params.id, 10)
            : Array.isArray(params.id)
                ? Number.parseInt(params.id[0], 10)
                : 0

    // State to store the candidate
    const [candidate, setCandidate] = useState<DetailedCandidate | null>(null)

    // Load the candidate when the component mounts or ID changes
    useEffect(() => {
        if (candidateId) {
            const foundCandidate = getDetailedCandidate(candidateId)
            if (foundCandidate) {
                setCandidate(foundCandidate)
            } else {
                // Handle case where candidate is not found
                toast({
                    title: "Candidate not found",
                    description: `No candidate found with ID ${candidateId}`,
                    variant: "destructive",
                })
            }
        }
    }, [candidateId, getDetailedCandidate, toast])

    // Download CV
    const downloadCV = () => {
        if (!candidate) return

        // In a real app, this would download the actual CV file
        toast({
            title: "CV Downloaded",
            description: `${candidate.name}'s CV has been downloaded.`,
            duration: 3000,
        })
    }

    // Show loading state while candidate data is being fetched
    if (!candidate) {
        return (
            <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/cv-ranking">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold">Candidate Details</h1>
                    </div>
                    <Card className="w-full p-6">
                        <CardContent className="flex items-center justify-center py-10">
                            <p>Loading candidate details...</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/cv-ranking">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold">Candidate Details</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted">
                                    <Image
                                        src="/placeholder.svg?height=128&width=128"
                                        alt={candidate.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-center">
                                    <CardTitle>{candidate.name}</CardTitle>
                                    <CardDescription>{candidate.position}</CardDescription>
                                </div>
                                <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                                    <Star className="h-4 w-4 fill-primary text-primary" />
                                    <span className="font-medium">{candidate.matchScore}% Match</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{candidate.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{candidate.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{candidate.location}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button
                                className="w-full"
                                variant={candidate.selected ? "default" : "outline"}
                                onClick={() => {
                                    toggleCandidateSelection(candidate.id)
                                    // Update local state to reflect the change immediately
                                    setCandidate((prev) => {
                                        if (!prev) return prev
                                        return { ...prev, selected: !prev.selected }
                                    })
                                    toast({
                                        title: candidate.selected ? "Candidate unselected" : "Candidate selected",
                                        description: `${candidate.name} has been ${candidate.selected ? "removed from" : "added to"
                                            } your selection.`,
                                        duration: 3000,
                                    })
                                }}
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {candidate.selected ? "Selected" : "Select Candidate"}
                            </Button>
                            <Button variant="outline" className="w-full" onClick={downloadCV}>
                                <Download className="mr-2 h-4 w-4" />
                                Download CV
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Professional Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                                    <User className="h-5 w-5 text-primary" />
                                    Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                                    <Briefcase className="h-5 w-5 text-primary" />
                                    Work Experience
                                </h3>
                                <div className="space-y-4">
                                    {candidate.experience.map((exp, index) => (
                                        <div key={index} className="border-l-2 border-muted pl-4 pb-2">
                                            <div className="flex justify-between">
                                                <h4 className="font-medium">{exp.position}</h4>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Calendar className="mr-1 h-4 w-4" />
                                                    {exp.duration}
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                                            <p className="text-sm">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    Education
                                </h3>
                                <div className="space-y-4">
                                    {candidate.education.map((edu, index) => (
                                        <div key={index} className="border-l-2 border-muted pl-4 pb-2">
                                            <div className="flex justify-between">
                                                <h4 className="font-medium">{edu.degree}</h4>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Calendar className="mr-1 h-4 w-4" />
                                                    {edu.duration}
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
